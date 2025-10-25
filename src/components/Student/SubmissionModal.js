import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

const SubmissionModal = ({ assignment, existingSubmission, onSubmit, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      answer: existingSubmission?.answer || ''
    }
  });

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(assignment._id, data.answer);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReadOnly = !!existingSubmission;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {isReadOnly ? 'View Submission' : 'Submit Assignment'}
          </h3>
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
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {assignment.title}
            </h4>
            <p className="text-gray-600 mb-3">{assignment.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Due Date:</span>
                <span className="ml-2 text-gray-600">
                  {format(new Date(assignment.dueDate), 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Teacher:</span>
                <span className="ml-2 text-gray-600">{assignment.teacher.name}</span>
              </div>
            </div>
          </div>

          {/* Submission Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                Your Answer {!isReadOnly && '*'}
              </label>
              <textarea
                {...register('answer', {
                  required: !isReadOnly ? 'Answer is required' : false,
                  maxLength: {
                    value: 2000,
                    message: 'Answer must be less than 2000 characters'
                  }
                })}
                rows={8}
                className="input-field"
                placeholder={isReadOnly ? 'No answer provided' : 'Enter your answer here...'}
                readOnly={isReadOnly}
                disabled={isReadOnly}
              />
              {errors.answer && (
                <p className="mt-1 text-sm text-red-600">{errors.answer.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {isReadOnly ? 'This submission cannot be edited' : 'Maximum 2000 characters'}
              </p>
            </div>

            {existingSubmission && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Submitted on:</strong> {format(new Date(existingSubmission.submittedAt), 'MMM dd, yyyy HH:mm')}
                </p>
                {existingSubmission.isReviewed && (
                  <p className="text-sm text-green-800 mt-1">
                    <strong>Status:</strong> Reviewed by teacher
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                {isReadOnly ? 'Close' : 'Cancel'}
              </button>
              
              {!isReadOnly && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
