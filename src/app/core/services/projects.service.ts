import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    private http = inject(HttpClient);
    private readonly PROJECTS_PATH = 'projects/projects-data.json';

    public getAllProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.PROJECTS_PATH).pipe(
            map(projects => projects.sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )),
            catchError(error => {
                console.error('Error loading projects:', error);
                return of([]);
            })
        );
    }

    public getProjectBySlug(slug: string): Observable<Project | undefined> {
        return this.getAllProjects().pipe(
            map(projects => projects.find(project => project.slug === slug))
        );
    }

    public getAllTechnologies(): Observable<string[]> {
        return this.getAllProjects().pipe(
            map(projects => {
                const techs = new Set<string>();
                projects.forEach(project =>
                    project.technologies.forEach(tech => techs.add(tech.name))
                );
                return Array.from(techs).sort();
            })
        );
    }

    public getProjectsByTechnology(techName: string): Observable<Project[]> {
        return this.getAllProjects().pipe(
            map(projects => projects.filter(project =>
                project.technologies.some(tech =>
                    tech.name.toLowerCase() === techName.toLowerCase()
                )
            ))
        );
    }


    public getFeaturedProjects(): Observable<Project[]> {
        return this.getAllProjects().pipe(
            map(projects => projects.filter(project => project.featured))
        );
    }


    public searchProjects(query: string): Observable<Project[]> {
        return this.getAllProjects().pipe(
            map(projects => projects.filter(project =>
                project.title.toLowerCase().includes(query.toLowerCase()) ||
                project.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
                project.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            ))
        );
    }
}