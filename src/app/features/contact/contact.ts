import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouteAnimationDirective } from '../../shared/directives/route-animation.directive';

interface ContactMethod {
  icon: string;
  title: string;
  description: string;
  value: string;
  primaryAction: {
    label: string;
    type: 'copy' | 'link';
    url?: string;
  };
  secondaryAction?: {
    label: string;
    type: 'link';
    url: string;
  };
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    RouteAnimationDirective
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  copiedEmail = signal(false);

  contactMethods: ContactMethod[] = [
    {
      icon: 'work',
      title: 'LinkedIn',
      description: "Let's connect!",
      value: 'I respond faster on LinkedIn',
      primaryAction: {
        label: 'Connect',
        type: 'link',
        url: 'https://www.linkedin.com/in/carlos-gilberto-ayala-limon-8a9413147'
      },
    },
    {
      icon: 'code',
      title: 'GitHub',
      description: 'Explore my repositories',
      value: 'View my code',
      primaryAction: {
        label: 'View Profile',
        type: 'link',
        url: 'https://github.com/gilbertoayala12'
      },
    },
    {
      icon: 'email',
      title: 'Email',
      description: 'Prefer email?',
      value: 'gilbertoayala12@gmail.com',
      primaryAction: {
        label: 'Copy Email',
        type: 'copy'
      },
      secondaryAction: {
        label: 'Send Email',
        type: 'link',
        url: 'mailto:gilbertoayala12@gmail.com'
      },
    },
  ];

  availability = [
    'Full-time opportunities',
    'Freelance projects',
    'Collaborations',
    'Technical discussions',
    'Open to relocate'
  ];

  constructor(private snackBar: MatSnackBar) { }

  handleAction(method: ContactMethod, actionType: 'primary' | 'secondary') {
    const action = actionType === 'primary' ? method.primaryAction : method.secondaryAction;

    if (!action) return;

    if (action.type === 'copy') {
      this.copyToClipboard(method.value);
    } else if (action.type === 'link' && action.url) {
      window.open(action.url, '_blank');
    }
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedEmail.set(true);
      this.snackBar.open('Email copied to clipboard! ✓', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });

      // Reset after 3 seconds
      setTimeout(() => {
        this.copiedEmail.set(false);
      }, 3000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      this.snackBar.open('Failed to copy email', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    });
  }
}