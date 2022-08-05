const { jsPDF } = require('jsPDF');
const fs = require('fs');

const createPDF = async ({id, name}) => {
    const doc = new jsPDF();
    await fs.promises.mkdir(`/exp/${id}.pdf`, { recursive: true }).catch(console.error);
    doc.text(`${name}'s Medical Record`, 10, 10);
    doc.save(`/exp/${id}.pdf`);
}


createPDF({
    id: "1",
    name: "Jorge"
})