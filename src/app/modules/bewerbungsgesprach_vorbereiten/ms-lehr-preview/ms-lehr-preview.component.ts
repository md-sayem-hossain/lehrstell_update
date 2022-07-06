import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { CommonService } from 'src/app/core/services/common.service';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  BorderStyle,
  ImageRun,
  TextWrappingType,
  TextWrappingSide,
  Alignment,
} from "docx";


@Component({
  selector: 'app-ms-lehr-preview',
  templateUrl: './ms-lehr-preview.component.html',
  styleUrls: ['./ms-lehr-preview.component.scss']
})
export class MsLehrPreviewComponent implements OnInit {

  constructor(public commonService: CommonService, private router: Router, public sanitizer: DomSanitizer) { }
  @ViewChild('content') content!: ElementRef;
  beilagen = ''

  ngOnInit(): void {
    let beilagenArray = []
    beilagenArray.push(this.commonService.lehrStepThreeData.lebenslauf ? 'Lebenslauf' : '')
    beilagenArray.push(this.commonService.lehrStepThreeData.zeugnisse ? 'Zeugnisse' : '')
    beilagenArray.push(this.commonService.lehrStepThreeData.stellwerktest ? 'Stellwerktest' : '')
    beilagenArray.push(this.commonService.lehrStepThreeData.Schnupperberichte ? 'Schnupperberichte' : '')
    beilagenArray.push(this.commonService.lehrStepThreeData.multicheck ? 'Multicheck' : '')
    beilagenArray.push(this.commonService.lehrStepThreeData.eigene)
    var filtered = beilagenArray.filter((el: any) => {
      return el != "";
    });
    this.beilagen = filtered.join(' / ')
    // console.log("array-->", this.beilagen)

  }

  onBack() {
    this.router.navigateByUrl('/bewerbungsgesprach_vorbereiten')
  }

  loader = false
  exportToPDF() {
    
     this.loader = true
    let that = this
    html2canvas(document.getElementById('pdf-page')!, {
      allowTaint: true,
      scale: 4,
      width: this.content.nativeElement.offsetWidth,
      height: this.content.nativeElement.offsetHeight
    }).then(function (canvas) {
      const contentDataURL = canvas.toDataURL('image/jpeg')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;

      // if (height > 0) {
      //   var j = 1;
      //   while (j != height) {
      //      pdf.addImage(contentDataURL, 'JPEG', 0, 0, width, height)
      //       j++;
      //   }}

     
      let name = 'lehrstell-motivation-sschreiben' + new Date().toUTCString() + '.pdf'
      pdf.save(name); // Generated PDF
      that.loader = false
    });
  }




//sayem
exportToWord() {
  const doc = new Document({
      styles: {
          default: {
              heading2: {
                  run: {
                      size: 36,
                      bold: true,
                      color: "000000",
                      font: "Calibri"
                  },
                  paragraph: {
                      spacing: {
                          after: 400,
                      },
                  },
              }
          },
          paragraphStyles: [
              {
                  id: "paragraphStyle",
                  name: "ParagraphStyle",
                  basedOn: "Normal",
                  next: "Normal",
                  run: {
                      color: "000000",
                      font: "Calibri"
                  }
              }
          ]
      },
      title: 'lehrstell-motivation-sschreiben',
      sections: [{
          properties: {
              page: {
                  margin: {
                      top: 1000,
                      bottom: 1000,
                      left: 1000,
                      right: 1000
                  }
              }
          },
          children: [
               
              new Paragraph({
                  text: "Vorbereitungsfragen für dein Bewerbungsgespräch",
                  heading: HeadingLevel.HEADING_2
              }),
              
              new Paragraph({
                style: "paragraphStyle",
                spacing: {
                    before: 700,
                },
                children: [
                    new TextRun({
                      text: "1) Wer hat dich beim Schreiben deines Bewerbungsdossiers unterstützt?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepOneData.textArea10}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),
                    
                    
                    
                    new TextRun({
                      break:2,
                      text: "2) Wie sind deine Schulnoten?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepOneData.textArea11}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),
                    


                    new TextRun({
                      break:2,
                      text: "3) Wie sind deine Zeugnisse (Verhalten/ Absenzen)?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepOneData.textArea12}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),



                    new TextRun({
                      break:2,
                      text: "4) Wie gerne erledigst du Hausaufgaben und wie lernst du für Prüfungen (Was ist deine Lernstrategie)?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepTwoData.textArea1}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "5) Warum möchtest du diesen Beruf erlernen?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepTwoData.textArea2}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "6) Erfüllst du die schulischen und persönlichen Voraussetzungen für die Lehrstelle?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepTwoData.textArea3}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "7) Warum hast du dich für diese Firma entschieden?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepThreeData3.textArea4}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "8) Kannst du erklären, was die Firma macht? (Produkte, Dienstleistungen)",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepThreeData3.textArea5}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "9) Welche Schnupperlehren hast du bis jetzt absolviert? Was hat dir gefallen und was nicht?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepThreeData3.textArea6}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "10) Was erwartest du von deiner Lehrstelle?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepFourData4.textArea7}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "11) Welches sind deine Stärken und deine Schwächen?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepFourData4.textArea8}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "12) Arbeitsverhalten: Kannst du anpacken und bist du ausdauernd? Nenne Beispiele von dir!",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepFourData4.textArea9}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "13) Kannst du mit anderen zusammenarbeiten? Nenne Beispiele aus der Schule/ Freizeit.",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepFiveData5.textArea13}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "14) Wie reagierst du in einer Konfliktsituation oder in einem Streit? Nenne Beispiele von dir.",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepFiveData5.textArea14}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "15) Welche Hobbys hast du und wie verbringst du deine Freizeit/ Schulferien?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepFiveData5.textArea15}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "16) Erzähle etwas über deine Familie (Eltern, Geschwister, Beruf, Schule, wer unterstützt dich?)",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepSixData6.textArea16}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "17) Falls du die Lehrstelle beginnst, wie kommst du an den Arbeitsort?",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepSixData6.textArea17}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    new TextRun({
                      break:2,
                      text: "18) Wie sieht deine Zukunft aus? (beruflich, privat)",
                      bold: true,
                      size: 24,
                    }),
                    new TextRun({
                        break:2,
                        text: `${this.commonService.lehrStepSixData6.textArea18}`,
                        italics: true,
                        size: 24,
                        color: "8282ff",
                    }),
                    new TextRun({
                      break:2,
                      text: "Notiz:",
                      bold: true,
                      size: 20,
                    }),


                    
                ],
            }),
           ],
      }],
  });

  Packer.toBlob(doc).then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = 'lehrstell-motivation-sschreiben' + new Date().toUTCString() + '.doc';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
  });
}















  // exportToWord() {
  //   var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>lehrstell-motivation-sschreiben</title></head><body style='font-family: Calibri'>";
  //   var postHtml = "</body></html>";
  //   var html = preHtml + this.content.nativeElement.innerHTML + postHtml;

  //   // Specify link url
  //   var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

  //   // Specify file name
  //   let filename = 'lehrstell-motivation-sschreiben' + new Date().toUTCString() + '.doc'
  //   // Create download link element
  //   var downloadLink = document.createElement("a");

  //   document.body.appendChild(downloadLink);

  //   downloadLink.href = url;

  //   // Setting the file name
  //   downloadLink.download = filename;

  //   //triggering the function
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);

  // }

  isObjectEmpty(Obj: any) {
    for (var key in Obj) {
      if (Obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
}
