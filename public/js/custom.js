// Dashboard JavaScript
class JobDashboard {
    constructor() {
        this.apiUrl = '/api';
        this.init();
    }

    init() {
        this.setupAxios();
        this.loadDashboardData();
        this.setupEventListeners();
    }

    setupAxios() {
        // Set up CSRF token for all requests
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
        }

        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }

    async loadDashboardData() {
        try {
            await Promise.all([
                this.loadStats(),
                this.loadJobs()
            ]);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    async loadStats() {
        try {
            const response = await axios.get(`${this.apiUrl}/dashboard/stats`);
            const stats = response.data;
            this.renderStats(stats);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    renderStats(stats) {
        const statsCardsHtml = `
            <div class="col-md-4 mb-3">
                <div class="stats-card blue">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="stats-number">${stats.open_jobs}</div>
                            <div class="stats-label">Open Job</div>
                        </div>
                        <div class="stats-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="stats-card yellow">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="stats-number">${stats.saved_candidates}</div>
                            <div class="stats-label">Saved Candidates</div>
                        </div>
                        <div class="stats-icon">
                            <i class="fa-regular fa-address-card"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="stats-card red">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="stats-number">${stats.pending_jobs}</div>
                            <div class="stats-label">Pending Jobs</div>
                        </div>
                        <div class="stats-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const planStatsHtml = `
            <div class="col-md-3 mb-3">
                <div class="stats-card green">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="stats-number">${stats.active_jobs}</div>
                            <div class="stats-label">Active Jobs</div>
                        </div>
                        <div class="stats-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="stats-card yellow">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="stats-number">${stats.highlight_jobs}</div>
                            <div class="stats-label">Highlight Jobs</div>
                        </div>
                        <div class="stats-icon">
                            <i class="fa-solid fa-star-of-life"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="stats-card blue">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="stats-number">${stats.featured_jobs}</div>
                            <div class="stats-label">Featured Jobs</div>
                        </div>
                        <div class="stats-icon">
                            <i class="fa-regular fa-circle-check"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="stats-card red">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="stats-number">${stats.profile_views}</div>
                            <div class="stats-label">Profile View</div>
                        </div>
                        <div class="stats-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('statsCards').innerHTML = statsCardsHtml;
        document.getElementById('planStats').innerHTML = planStatsHtml;
    }

    async loadJobs() {
        try {
            const response = await axios.get(`${this.apiUrl}/jobs`);
            const jobs = response.data;
            this.renderJobs(jobs);
        } catch (error) {
            console.error('Error loading jobs:', error);
        }
    }

    renderJobs(jobs) {
        const tbody = document.querySelector('#jobsTable tbody');

        if (jobs.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center py-4">
                        <div class="text-muted">
                            <i class="fas fa-briefcase fa-2x mb-2"></i>
                            <p>No jobs found. Create your first job posting!</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        const jobsHtml = jobs.map(job => `
            <tr class="fade-in">
                <td>
                    <div>
                        <div class="job-title">${job.title}</div>
                        <div style="display:flex;">
                            <div class="job-type">${job.type}</div>&nbsp;&nbsp;
                            <div class="job-duration">${job.duration}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="status-badge ${job.status.toLowerCase()}">
                        <i class="fas fa-circle"></i>
                        ${job.status === 'Expired' ? 'Job Expire' : job.status}
                    </span>
                </td>
                <td>
                    <div class="application-count">
                        <i class="fas fa-users"></i> ${job.applications} Applications
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-action btn-view" onclick="dashboard.viewJob(${job.id})">
                            View Applications
                        </button>
                        <div class="dropdown text-end p-2">
                            <button class="btn btn-sm border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end" style="border:none;    transform: translate(136px, -36px);">
                                <li>
                                <a class="dropdown-item" href="javascript:void(0)" onclick="dashboard.editJob(${job.id})">
                                    <i class="fa-regular fa-pen-to-square"></i> Edit
                                </a>
                                </li>
                                <li>
                                <a class="dropdown-item" href="javascript:void(0)" onclick="dashboard.deleteJob(${job.id})">
                                    <i class="fa-regular fa-trash-can"></i></i> Delete
                                </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = jobsHtml;
    }

    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(link);
            });
        });

        // Form submissions
        document.getElementById('jobForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitJob();
        });
    }

    handleNavigation(link) {
        // Remove active class from all links
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(l => {
            l.classList.remove('active');
        });

        // Add active class to clicked link
        link.classList.add('active');

        // Handle submenu toggle
        const submenu = link.nextElementSibling;
        if (submenu && submenu.classList.contains('sub-menu')) {
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        }
    }

    async submitJob() {
        const form = document.getElementById('jobForm');
        const formData = new FormData(form);
        const jobData = Object.fromEntries(formData.entries());

        // Set default applications to 0
        jobData.applications = 0;

        try {
            this.showLoading(true);
            const response = await axios.post(`${this.apiUrl}/jobs`, jobData);

            this.showSuccess('Job posted successfully!');
            this.closeModal('postJobModal');
            form.reset();
            await this.loadDashboardData();
        } catch (error) {
            console.error('Error creating job:', error);
            this.showError('Failed to create job. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    async editJob(jobId) {
        try {
            const response = await axios.get(`${this.apiUrl}/jobs/${jobId}`);
            const job = response.data;

            // Populate edit form
            document.getElementById('editJobId').value = job.id;
            document.getElementById('editJobTitle').value = job.title;
            document.getElementById('editJobType').value = job.type;
            document.getElementById('editJobStatus').value = job.status;
            document.getElementById('editJobDuration').value = job.duration;
            document.getElementById('editJobDescription').value = job.description;

            // Show edit modal
            const modal = new bootstrap.Modal(document.getElementById('editJobModal'));
            modal.show();
        } catch (error) {
            console.error('Error loading job for edit:', error);
            this.showError('Failed to load job details');
        }
    }

    async updateJob() {
        const form = document.getElementById('editJobForm');
        const formData = new FormData(form);
        const jobData = Object.fromEntries(formData.entries());
        const jobId = document.getElementById('editJobId').value;

        try {
            this.showLoading(true);
            const response = await axios.put(`${this.apiUrl}/jobs/${jobId}`, jobData);

            this.showSuccess('Job updated successfully!');
            this.closeModal('editJobModal');
            await this.loadDashboardData();
        } catch (error) {
            console.error('Error updating job:', error);
            this.showError('Failed to update job. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    async deleteJob(jobId) {
        if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
            return;
        }

        try {
            this.showLoading(true);
            await axios.delete(`${this.apiUrl}/jobs/${jobId}`);

            this.showSuccess('Job deleted successfully!');
            await this.loadDashboardData();
        } catch (error) {
            console.error('Error deleting job:', error);
            this.showError('Failed to delete job. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    viewJob(jobId) {
        // Placeholder for view job functionality
        this.showInfo(`Viewing applications for job ID: ${jobId}`);
    }

    closeModal(modalId) {
        const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
        if (modal) {
            modal.hide();
        }
    }

    showLoading(show) {
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(btn => {
            if (show) {
                btn.disabled = true;
                btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
            } else {
                btn.disabled = false;
                btn.innerHTML = btn.getAttribute('data-original-text') || 'Submit';
            }
        });
    }

    showSuccess(message) {
        this.showToast(message, 'success');
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showInfo(message) {
        this.showToast(message, 'info');
    }

    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        toast.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }
}

// Global functions for onclick handlers
window.submitJob = function () {
    dashboard.submitJob();
};

window.updateJob = function () {
    dashboard.updateJob();
};

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    window.dashboard = new JobDashboard();
});