import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";

type UserFormGroup = {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: "app-profile-edit",
  imports: [ReactiveFormsModule],
  templateUrl: "./profile-edit.component.html",
  styleUrl: "./profile-edit.component.scss",
})
export class ProfileEditComponent {
  http = inject(HttpClient);
  formBuilder = inject(NonNullableFormBuilder);
  form: FormGroup<UserFormGroup> = this.formBuilder.group({
    username: [""],
    email: [""],
    password: [""],
  });

  onSubmit() {
    // const formData = new FormData();
    // formData.append("username", this.form.value.username || "");
    // formData.append("password", this.form.value.password || "");
    // formData.append("email", this.form.value.email || "");
    const body = new HttpParams()
      .set("username", this.form.value.username || "")
      .set("password", this.form.value.password || "")
      .set("email", this.form.value.email || "");

    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    this.http
      .post("/api/profile", body.toString(), { headers })
      .subscribe(() => {
        alert("Profile updated");
      });
  }
}
