
export function printDiv(divId: string) {
    const content = document.getElementById(divId)?.innerHTML;
    if (!content) return;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>Печать</title>
        <style>
          /* сброс отступов */
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.focus();
   printWindow.print();
    printWindow.close();
}
