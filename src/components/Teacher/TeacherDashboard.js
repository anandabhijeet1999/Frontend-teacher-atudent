import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import AssignmentList from './AssignmentList';
import CreateAssignment from './CreateAssignment';
import AssignmentDetails from './AssignmentDetails';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/assignments');
      setAssignments(response.data);
    } catch (error) {
      toast.error('Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (assignmentData) => {
    try {
      const response = await api.post('/assignments', assignmentData);
      setAssignments([response.data, ...assignments]);
      toast.success('Assignment created successfully');
      setActiveTab('list');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create assignment');
    }
  };

  const handleUpdateAssignment = async (id, data) => {
    try {
      const response = await api.put(`/assignments/${id}`, data);
      setAssignments(assignments.map(assignment => 
        assignment._id === id ? response.data : assignment
      ));
      toast.success('Assignment updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update assignment');
    }
  };

  const handleDeleteAssignment = async (id) => {
    try {
      await api.delete(`/assignments/${id}`);
      setAssignments(assignments.filter(assignment => assignment._id !== id));
      toast.success('Assignment deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete assignment');
    }
  };

  const handlePublishAssignment = async (id) => {
    try {
      const response = await api.put(`/assignments/${id}/publish`);
      setAssignments(assignments.map(assignment => 
        assignment._id === id ? response.data : assignment
      ));
      toast.success('Assignment published successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to publish assignment');
    }
  };

  const handleCompleteAssignment = async (id) => {
    try {
      const response = await api.put(`/assignments/${id}/complete`);
      setAssignments(assignments.map(assignment => 
        assignment._id === id ? response.data : assignment
      ));
      toast.success('Assignment marked as completed');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to complete assignment');
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const getStats = () => {
    const total = assignments.length;
    const draft = assignments.filter(a => a.status === 'draft').length;
    const published = assignments.filter(a => a.status === 'published').length;
    const completed = assignments.filter(a => a.status === 'completed').length;
    
    return { total, draft, published, completed };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">Manage your assignments and track student progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Assignments</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
          <div className="text-sm text-gray-600">Draft</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('list')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'list'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Assignments
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'create'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Assignment
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'list' && (
            <AssignmentList
              assignments={filteredAssignments}
              filter={filter}
              setFilter={setFilter}
              onUpdate={handleUpdateAssignment}
              onDelete={handleDeleteAssignment}
              onPublish={handlePublishAssignment}
              onComplete={handleCompleteAssignment}
              onViewDetails={setSelectedAssignment}
            />
          )}
          
          {activeTab === 'create' && (
            <CreateAssignment onSubmit={handleCreateAssignment} />
          )}
        </div>
      </div>

      {/* Assignment Details Modal */}
      {selectedAssignment && (
        <AssignmentDetails
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
