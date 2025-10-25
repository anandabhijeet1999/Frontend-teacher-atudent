import React from 'react';
import { format } from 'date-fns';

const AssignmentList = ({ assignments, submissions, onViewAssignment }) => {
  const getSubmissionForAssignment = (assignmentId) => {
    return submissions.find(sub => sub.assignment._id === assignmentId);
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const canSubmit = (assignment) => {
    const submission = getSubmissionForAssignment(assignment._id);
    const isPastDue = isOverdue(assignment.dueDate);
    return !submission && !isPastDue;
  };

  const getStatusBadge = (assignment) => {
    const submission = getSubmissionForAssignment(assignment._id);
    const isPastDue = isOverdue(assignment.dueDate);
    
    if (submission) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          Submitted
        </span>
      );
    } else if (isPastDue) {
      return (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
          Overdue
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
          Available
        </span>
      );
    }
  };

  return (
    <div className="space-y-4">
      {assignments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No assignments available</p>
        </div>
      ) : (
        assignments.map((assignment) => {
          const submission = getSubmissionForAssignment(assignment._id);
          const isPastDue = isOverdue(assignment.dueDate);
          
          return (
            <div key={assignment._id} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {assignment.title}
                    </h3>
                    {getStatusBadge(assignment)}
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {assignment.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>
                      Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}
                    </span>
                    {isPastDue && (
                      <span className="text-red-600 font-medium">Overdue</span>
                    )}
                    <span>
                      Teacher: {assignment.teacher.name}
                    </span>
                  </div>
                  
                  {submission && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">
                        ✓ You submitted this assignment on{' '}
                        {format(new Date(submission.submittedAt), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {canSubmit(assignment) ? (
                    <button
                      onClick={() => onViewAssignment(assignment)}
                      className="btn-primary text-sm"
                    >
                      Submit Answer
                    </button>
                  ) : submission ? (
                    <button
                      onClick={() => onViewAssignment(assignment)}
                      className="btn-secondary text-sm"
                    >
                      View Submission
                    </button>
                  ) : (
                    <span className="text-sm text-gray-500">
                      {isPastDue ? 'Submission closed' : 'Not available'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AssignmentList;
