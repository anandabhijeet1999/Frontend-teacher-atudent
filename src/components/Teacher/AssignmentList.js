import React from 'react';
import { format } from 'date-fns';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AssignmentList = ({
  assignments,
  filter,
  setFilter,
  onUpdate,
  onDelete,
  onPublish,
  onComplete,
  onViewDetails
}) => {
  const handleStatusChange = async (id, action) => {
    try {
      if (action === 'publish') {
        await onPublish(id);
      } else if (action === 'complete') {
        await onComplete(id);
      }
    } catch (error) {
      toast.error('Failed to update assignment status');
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

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Filter by status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-field w-auto"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No assignments found</p>
          </div>
        ) : (
          assignments.map((assignment) => (
            <div key={assignment._id} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {assignment.title}
                    </h3>
                    <span className={getStatusBadge(assignment.status)}>
                      {assignment.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {assignment.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>
                      Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}
                    </span>
                    {isOverdue(assignment.dueDate) && (
                      <span className="text-red-600 font-medium">Overdue</span>
                    )}
                    <span>
                      Created: {format(new Date(assignment.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onViewDetails(assignment)}
                    className="btn-secondary text-sm"
                  >
                    View Details
                  </button>
                  
                  {assignment.status === 'draft' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(assignment._id, 'publish')}
                        className="btn-primary text-sm"
                      >
                        Publish
                      </button>
                    </>
                  )}
                  
                  {assignment.status === 'published' && (
                    <button
                      onClick={() => handleStatusChange(assignment._id, 'complete')}
                      className="btn-primary text-sm"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentList;
