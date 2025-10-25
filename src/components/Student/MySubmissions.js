import React from 'react';
import { format } from 'date-fns';

const MySubmissions = ({ submissions }) => {
  const getStatusBadge = (submission) => {
    if (submission.isReviewed) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          Reviewed
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
          Pending Review
        </span>
      );
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-4">
      {submissions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No submissions yet</p>
        </div>
      ) : (
        submissions.map((submission) => (
          <div key={submission._id} className="card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {submission.assignment.title}
                  </h3>
                  {getStatusBadge(submission)}
                </div>
                
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {submission.assignment.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span>
                    Due: {format(new Date(submission.assignment.dueDate), 'MMM dd, yyyy')}
                  </span>
                  {isOverdue(submission.assignment.dueDate) && (
                    <span className="text-red-600 font-medium">Overdue</span>
                  )}
                  <span>
                    Teacher: {submission.assignment.teacher.name}
                  </span>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Your Answer:</strong>
                  </p>
                  <p className="text-sm text-gray-600">{submission.answer}</p>
                </div>
                
                <div className="mt-3 text-sm text-gray-500">
                  <span>
                    Submitted: {format(new Date(submission.submittedAt), 'MMM dd, yyyy HH:mm')}
                  </span>
                  {submission.isReviewed && submission.reviewedAt && (
                    <span className="ml-4">
                      Reviewed: {format(new Date(submission.reviewedAt), 'MMM dd, yyyy HH:mm')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MySubmissions;
