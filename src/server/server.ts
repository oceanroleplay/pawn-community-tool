import {
    createConnection, TextDocuments, ProposedFeatures, CompletionItem, TextDocumentPositionParams, TextDocumentSyncKind,
    Hover, DefinitionParams, SignatureHelpParams, SignatureHelp, CompletionList
} from 'vscode-languageserver';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { parseSnippets, doCompletion, doCompletionResolve, doGoToDef, doHover, doSignHelp } from './parser';

let connection = createConnection(ProposedFeatures.all);
let documents = new TextDocuments(TextDocument);
documents.listen(connection);
connection.listen();

connection.onInitialize(() => {
    return {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Full,
            // Tell the client that the server supports code completion
            completionProvider: {
                resolveProvider: true
            },
            definitionProvider: true,
            hoverProvider: true,
            signatureHelpProvider: {
                triggerCharacters: ['(', ',']
            }
        }
    };
});

connection.onInitialized(() => {
});


connection.onDidChangeConfiguration(() => {
    documents.all().forEach(parseSnippets);
});

documents.onDidClose(() => {
});

documents.onDidChangeContent(change => {
    parseSnippets(change.document);
});

connection.onDidChangeWatchedFiles(_change => {
});

connection.onDefinition((textDocumentIdentifier: DefinitionParams) => {
    const doc = documents.get(textDocumentIdentifier.textDocument.uri);
    if (doc === undefined) return;
    return doGoToDef(doc, textDocumentIdentifier.position);
});

connection.onHover((params: TextDocumentPositionParams): Hover | undefined => {
    const doc = documents.get(params.textDocument.uri);
    if (doc === undefined) return;
    return doHover(doc, params.position);
});

connection.onSignatureHelp((params: SignatureHelpParams): SignatureHelp | undefined => {
    const doc = documents.get(params.textDocument.uri);
    if (doc === undefined) return;
    return doSignHelp(doc, params.position);
});

connection.onCompletion(
    async (_textDocumentPosition: TextDocumentPositionParams) => {
        const c: CompletionList = { isIncomplete: false, items: await doCompletion() };
        return c;
    }
);

connection.onCompletionResolve(
    async (item: CompletionItem): Promise<CompletionItem> => {
        return await doCompletionResolve(item);
    }
);