import React from 'react';
import { useForm } from 'react-hook-form';

const CreateAssignment = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Assignment</h2>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Assignment Title *
          </label>
          <input
            {...register('title', {
              required: 'Title is required',
              maxLength: {
                value: 100,
                message: 'Title must be less than 100 characters'
              }
            })}
            type="text"
            className="input-field"
            placeholder="Enter assignment title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            {...register('description', {
              required: 'Description is required',
              maxLength: {
                value: 1000,
                message: 'Description must be less than 1000 characters'
              }
            })}
            rows={4}
            className="input-field"
            placeholder="Enter assignment description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date *
          </label>
          <input
            {...register('dueDate', {
              required: 'Due date is required',
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate > today || 'Due date must be in the future';
              }
            })}
            type="datetime-local"
            className="input-field"
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-secondary"
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;
