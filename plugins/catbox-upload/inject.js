const {
    util: { getFiber },
} = shelter;

export async function injectLinks(urls) {
    try {
        const fiber = getFiber(document.querySelector('[class*="slateContainer"]'));
        if (!fiber) return false;
        
        const editor = fiber.child.pendingProps.editor;
        if (!editor) return false;

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            editor.insertText(url);
            if (i < urls.length - 1) {
                editor.insertText(" ");
            }
        }
        return true;
    } catch (e) {
        console.error("Failed to inject links:", e);
        return false;
    }
}
