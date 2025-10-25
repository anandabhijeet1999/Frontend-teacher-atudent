import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AssignmentDetails = ({ assignment, onClose }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/assignments/${assignment._id}/submissions`);
      setSubmissions(response.data);
    } catch (error) {
      toast.error('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  }, [assignment._id]);

  useEffect(() => {
    if (assignment) {
      fetchSubmissions();
    }
  }, [assignment, fetchSubmissions]);

  const handleReviewSubmission = async (submissionId) => {
    try {
      await api.put(`/submissions/${submissionId}/review`);
      setSubmissions(submissions.map(sub => 
        sub._id === submissionId ? { ...sub, isReviewed: true, reviewedAt: new Date() } : sub
      ));
      toast.success('Submission marked as reviewed');
    } catch (error) {
      toast.error('Failed to mark submission as reviewed');
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'draft':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'published':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (!assignment) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Assignment Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Assignment Info */}
          <div className="border-b pb-4">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="text-xl font-semibold text-gray-900">{assignment.title}</h4>
              <span className={getStatusBadge(assignment.status)}>
                {assignment.status}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{assignment.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Due Date:</span>
                <span className="ml-2 text-gray-600">
                  {format(new Date(assignment.dueDate), 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Created:</span>
                <span className="ml-2 text-gray-600">
                  {format(new Date(assignment.createdAt), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>
          </div>

          {/* Submissions */}
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-4">
              Student Submissions ({submissions.length})
            </h5>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : submissions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No submissions yet</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {submissions.map((submission) => (
                  <div key={submission._id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {submission.student.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Submitted: {format(new Date(submission.submittedAt), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {submission.isReviewed ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Reviewed
                          </span>
                        ) : (
                          <button
                            onClick={() => handleReviewSubmission(submission._id)}
                            className="btn-primary text-xs"
                          >
                            Mark Reviewed
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-700">{submission.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
