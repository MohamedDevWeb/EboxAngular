import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PrendreRdvService, RdvItem, Medecin, MotifItem } from '../services/prendre-rdv.service';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-prendre-rdv',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatCardModule, MatSelectModule,
    MatDatepickerModule, MatInputModule, MatTooltipModule, MatFormFieldModule,
    MatStepperModule, MatProgressSpinnerModule, MatSnackBarModule, TranslateModule
  ],
  templateUrl: './prendre-rdv.component.html',
  styleUrls: ['./prendre-rdv.component.scss']
})
export class PrendreRdvComponent implements OnInit {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  loadingMedecins = false;
  loadingCreneaux = false;
  saving = false;
  success = false;

  medecins: Medecin[] = [];
  motifs: MotifItem[] = [];
  creneaux: string[] = [];
  rdvForm: FormGroup;
  step = 0;
  pieceJointe: File | null = null;
  confirmation: RdvItem | null = null;

  private fb = inject(FormBuilder);
  private rdvService = inject(PrendreRdvService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.rdvForm = this.fb.group({
      medecin: [null, Validators.required],
      motif: [null, Validators.required],
      date: [null, Validators.required],
      creneau: [null, Validators.required],
      commentaire: [''],
      pieceJointe: [null]
    });
  }

  ngOnInit() {
    this.loadMedecins();
    this.loadMotifs();
  }

  loadMedecins() {
    this.loadingMedecins = true;
    this.rdvService.getMedecins().pipe(finalize(() => this.loadingMedecins = false)).subscribe(list => {
      this.medecins = list;
    });
  }
  loadMotifs() {
    this.motifs = this.rdvService.getMotifs();
  }
  onMedecinChange() {
    this.rdvForm.patchValue({ date: null, creneau: null });
    this.creneaux = [];
  }
  onDateChange(date: any) {
    const medecinId = this.rdvForm.value.medecin;
    if (medecinId && date) {
      this.loadingCreneaux = true;
      this.rdvService.getCreneaux(medecinId, date).pipe(finalize(() => this.loadingCreneaux = false)).subscribe(creneaux => {
        this.creneaux = creneaux;
      });
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.size < 10 * 1024 * 1024) {
      this.pieceJointe = file;
      this.rdvForm.patchValue({ pieceJointe: file });
    } else if (file) {
      this.snackBar.open("Fichier trop volumineux (max 10Mo)", "Fermer", { duration: 3500 });
      this.pieceJointe = null;
      this.rdvForm.patchValue({ pieceJointe: null });
    }
  }
  removeFile() {
    this.pieceJointe = null;
    this.rdvForm.patchValue({ pieceJointe: null });
    if (this.fileInputRef) this.fileInputRef.nativeElement.value = '';
  }

  nextStep() {
    if (this.step === 0 && this.rdvForm.controls['medecin'].valid && this.rdvForm.controls['motif'].valid) {
      this.step = 1;
    } else if (this.step === 1 && this.rdvForm.controls['date'].valid && this.rdvForm.controls['creneau'].valid) {
      this.step = 2;
    }
  }
  prevStep() {
    if (this.step > 0) this.step -= 1;
  }

  submit() {
    if (this.rdvForm.invalid) {
      this.snackBar.open("Merci de compléter tous les champs obligatoires.", "Fermer", { duration: 3000 });
      return;
    }
    this.saving = true;
    const formData = this.rdvForm.value;
    const item: RdvItem = {
      id: Date.now(),
      medecin: this.medecins.find(m => m.id === formData.medecin)!,
      motif: this.motifs.find(m => m.id === formData.motif)!,
      date: formData.date,
      creneau: formData.creneau,
      commentaire: formData.commentaire,
      pieceJointe: this.pieceJointe?.name || null
    };
    this.rdvService.prendreRdv(item).pipe(finalize(() => this.saving = false)).subscribe(() => {
      this.confirmation = item;
      this.success = true;
      this.rdvForm.reset();
      this.step = 0;
      this.pieceJointe = null;
      if (this.fileInputRef) this.fileInputRef.nativeElement.value = '';
      this.snackBar.open("Votre RDV a été enregistré !", "Fermer", { duration: 3500 });
    });
  }
  resetAll() {
    this.success = false;
    this.confirmation = null;
    this.step = 0;
    this.rdvForm.reset();
    this.pieceJointe = null;
    if (this.fileInputRef) this.fileInputRef.nativeElement.value = '';
  }
}
