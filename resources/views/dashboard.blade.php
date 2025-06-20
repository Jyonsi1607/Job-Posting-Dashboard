@extends('layouts.app')

@section('content')
    <div class="dashboard-header">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2>Hello, Karma Mark Start Up</h2>
                <p class="text-muted">Here are your daily activities & career opportunities</p>
            </div>
            <button class="btn btn-primary custome-style-btn" data-bs-toggle="modal" data-bs-target="#postJobModal"> Post a Job
            </button>
        </div>
    </div>

    <!-- Stats Cards -->
    <div class="row mb-4" id="statsCards">
        <!-- Stats will be loaded here -->
    </div>

    <!-- Additional Stats -->
    <div class="row mb-4">
        <div class="col-12">
            <h5>Stats from your current plan</h5>
        </div>
    </div>

    <div class="row mb-4" id="planStats">
        <!-- Plan stats will be loaded here -->
    </div>

    <!-- Recent Jobs Table -->
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Recent Jobs</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover" id="jobsTable">
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Status</th>
                            <th>Applications</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Jobs will be loaded here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Post Job Modal -->
    <div class="modal fade" id="postJobModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Post a New Job</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="jobForm">
                        <div class="mb-3">
                            <label for="jobTitle" class="form-label">Job Title</label>
                            <input type="text" class="form-control" id="jobTitle" name="title" required>
                        </div>
                        <div class="mb-3">
                            <label for="jobType" class="form-label">Job Type</label>
                            <select class="form-select" id="jobType" name="type" required>
                                <option value="">Select Type</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="jobStatus" class="form-label">Status</label>
                            <select class="form-select" id="jobStatus" name="status" required>
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Draft">Draft</option>
                                <option value="Expired">Expired</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="jobDuration" class="form-label">Duration</label>
                            <input type="text" class="form-control" id="jobDuration" name="duration"
                                placeholder="e.g., 2mos 1w Remaining" required>
                        </div>
                        <div class="mb-3">
                            <label for="jobDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="jobDescription" name="description" rows="4" required></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="submitJob()">Post Job</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Job Modal -->
    <div class="modal fade" id="editJobModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Job</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editJobForm">
                        <input type="hidden" id="editJobId">
                        <div class="mb-3">
                            <label for="editJobTitle" class="form-label">Job Title</label>
                            <input type="text" class="form-control" id="editJobTitle" name="title" required>
                        </div>
                        <div class="mb-3">
                            <label for="editJobType" class="form-label">Job Type</label>
                            <select class="form-select" id="editJobType" name="type" required>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="editJobStatus" class="form-label">Status</label>
                            <select class="form-select" id="editJobStatus" name="status" required>
                                <option value="Active">Active</option>
                                <option value="Draft">Draft</option>
                                <option value="Expired">Expired</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="editJobDuration" class="form-label">Duration</label>
                            <input type="text" class="form-control" id="editJobDuration" name="duration" required>
                        </div>
                        <div class="mb-3">
                            <label for="editJobDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="editJobDescription" name="description" rows="4" required></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="updateJob()">Update Job</button>
                </div>
            </div>
        </div>
    </div>
@endsection
