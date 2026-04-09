import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResourceService } from '../../core/services/resource.service';
import { I18nService } from '../../core/services/i18n.service';
import { Resource } from '../../core/models/resource.model';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resource-list.component.html'
})
export class ResourceListComponent implements OnInit {
  private readonly resourceService = inject(ResourceService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly i18n = inject(I18nService);

  resources: Resource[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.resourceService.getAll().subscribe({
      next: data => {
        this.resources = data;
        this.loading = false;
        this.error = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load resources. Is the API running?';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}