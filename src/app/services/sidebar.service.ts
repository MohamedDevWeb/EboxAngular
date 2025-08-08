export class SidebarComponent {
  menuOpen = false;
  isMobile = false;

  ngOnInit() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile.bind(this));
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.checkMobile.bind(this));
  }
  checkMobile() {
    this.isMobile = window.innerWidth <= 900;
    if (!this.isMobile) this.menuOpen = false;
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  logout() {
    localStorage.clear();
    window.location.href = '/login-flux';
  }
}
