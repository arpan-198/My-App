import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServices } from 'src/app/Services/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  myForm : FormGroup;
  csv:any;

  constructor(private auth :UserServices , private route : Router) { }

  ngOnInit(): void {
    this.myForm=new FormGroup({
      _fileUpload : new FormControl('')
    })
  }


  changeFile(e){
    if(e.target.files.length > 0){
      const file=e.target.files[0];
      this.csv=file;
      
    }
  }

  uploadFile(){
    const formData= new FormData();
    formData.append('file',this.csv);
    
    this.auth.httpPostUserUpload(formData).subscribe(
      (next)=>{alert(next.message)},
      (err)=>{ console.log(err); },
      ()=>{ this.route.navigate(['table']); }

    )
  }

}
