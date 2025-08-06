import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  chatHistory: ChatMessage[] = [];
  messageCtrl = new FormControl('');
  loading = false;
  errorMsg = '';
  isDarkMode = false;

  @ViewChild('chatContainer') chatContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;
  private chatbotService = inject(ChatbotService);

  ngOnInit(): void {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.loadHistory();
    if (this.chatHistory.length === 0) this.sendWelcome();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.scrollToBottom(), 150);
    setTimeout(() => this.input?.nativeElement.focus(), 500);
  }

  sendWelcome() {
    this.pushBot("👋 Bonjour ! Je suis votre assistant IA eBox Santé+. Posez-moi toutes vos questions sur l’application, la santé, ou la gestion de vos documents.");
  }

  sendMessage() {
    const userMessage = this.messageCtrl.value?.trim();
    if (!userMessage || this.loading) return;
    this.pushUser(userMessage);
    this.messageCtrl.setValue('');
    this.loading = true;
    this.errorMsg = '';
    this.saveHistory();

    this.chatbotService.ask(userMessage, this.chatHistory).subscribe({
      next: (botResponse: string) => {
        this.pushBot(botResponse);
        this.loading = false;
        this.saveHistory();
        this.scrollToBottom();
      },
      error: () => {
        this.errorMsg = "❌ Une erreur est survenue. Veuillez réessayer.";
        this.loading = false;
      }
    });
    setTimeout(() => this.scrollToBottom(), 120);
  }

  handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  pushUser(content: string) {
    this.chatHistory.push({
      sender: 'user',
      content,
      timestamp: new Date()
    });
    this.saveHistory();
    this.scrollToBottom();
  }

  pushBot(content: string) {
    this.chatHistory.push({
      sender: 'bot',
      content,
      timestamp: new Date()
    });
    this.saveHistory();
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.chatContainer) {
      setTimeout(() => {
        this.chatContainer!.nativeElement.scrollTop = this.chatContainer!.nativeElement.scrollHeight;
      }, 90);
    }
  }

  clearChat() {
    if (confirm('Effacer toute la conversation ?')) {
      this.chatHistory = [];
      this.saveHistory();
      this.sendWelcome();
      this.errorMsg = '';
    }
    this.scrollToBottom();
  }

  saveHistory() {
    localStorage.setItem('ebox-chatbot-history', JSON.stringify(this.chatHistory));
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('ebox-chatbot-history');
      this.chatHistory = saved ? JSON.parse(saved) : [];
    } catch {
      this.chatHistory = [];
    }
  }

  switchTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
