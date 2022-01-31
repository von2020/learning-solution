import { Component, OnDestroy, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit, OnDestroy {
  date = 'hi';
  private sub: any;
  certificateData: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      console.log(params);

      this.certificateData = params;

      setTimeout(() => {
        this.downloadPdf();
      }, 1000);
    });
  }

  downloadPdf() {
    var data = document.getElementById('cert');

    html2canvas(data, { scrollY: -window.scrollY, scale: 1 }).then(
      async (canvas) => {
        // Few necessary setting options
        var imgWidth = 150;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png', 1.0);

        let pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        // add tghis width height according to your requirement
        const divHeight = data.clientHeight;
        const divWidth = data.clientWidth;
        const ratio = divHeight / divWidth;

        const width = pdf.internal.pageSize.getWidth();
        let height = pdf.internal.pageSize.getHeight();
        // height = ratio * width;
        pdf.addImage(contentDataURL, 'PNG', 0, position, width, height);
        window.open(URL.createObjectURL(pdf.output('blob')));
      }
    );
  }
}
