import { Component ,OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  imgSrc!: string;
  selectedImage : any=null;
  isSubmitted!: boolean;
formTemplate = new FormGroup({
  caption: new FormControl('',Validators.required),
  category: new FormControl(''),
  imageUrl: new FormControl('',Validators.required),
})
  constructor( private storage: AngularFireStorage){}
  ngOnInit(): void {
    this.resetForm();
    
  }
  showPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc=e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage=event.target.files[0];
    }
    else{
      this.imgSrc='https://miro.medium.com/max/250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg';
      this.selectedImage=null;
    }
  }
  onSubmit(formValue:any){
    this.isSubmitted=true;
    if(this.formTemplate.valid){
      var filePath = `${formValue.category}}/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url: any) => {
            formValue['imageUrl'] = url;
            this.resetForm();
          })
        })
      ).subscribe();
    }

  }
 get formControls(){
    return this.formTemplate['controls'];

  }
  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption:'',
      imageUrl:'',
      category:'Animal'

    });
    this.imgSrc = "https://miro.medium.com/max/250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg";
    this.selectedImage=null;
    this.isSubmitted=false;
  }

}
