module.exports = function (template) {
    let title = template.htmlWebpackPlugin.options.title;
    let commons = template.htmlWebpackPlugin.options.common;
    let scripts = '';
    for (var chunk in commons) {
        scripts += `<script type="text/javascript" src="${commons[chunk]}"></script>`;
    }
    return (
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
        ${scripts}
    </head>
    <body>
        <div id=${template.htmlWebpackPlugin.options.root}></div>
    </body>
    </html>`
    )
}
