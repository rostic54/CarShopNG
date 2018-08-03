import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  logo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Unx05sp0wgk7iFULk9qzpxHL-krK1PfZaIKIZHJxXR2GyToypQ';

  constructor() { }

  ngOnInit() {
  }

}
