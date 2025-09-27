import React from 'react'
import { getAllIssues, createIssue, updateIssue, deleteIssue } from '../Services/IssueService';
import { FloatingBtn } from '../Components/Buttons/FloatingBtn';
import { IssueModal } from '../Components/IssueModal';
import { Select } from '../Components/Select';
import { IssueCardsContainer } from '../Components/IssueCardsContainer';

export function Home() {
  const [loading, setLoading] = React.useState(true);
  const [issues, setIssues] = React.useState([]);
  const [filters, setFilters] = React.useState({ status: '', priority: '' });
  const [pagination, setPagination] = React.useState({ currentPage: 1, totalPages: 1 });
  const [dataVersion, setDataVersion] = React.useState(0);

  const [openModal, setOpenModal] = React.useState(false);
  const [mode, setMode] = React.useState('view'); // 'view', 'edit', 'create'
  const [selectedData, setSelectedData] = React.useState({});

  const LIMIT_CARDS = 12;

  React.useEffect(() => {
    document.title = "Home"
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const params = {
          ...filters,
          page: pagination.currentPage,
          limit: LIMIT_CARDS
        };

        if (!params.status) delete params.status;
        if (!params.priority) delete params.priority;

        const response = await getAllIssues(params);

        setIssues(response.issues);
        setPagination({
          currentPage: response.currentPage,
          totalPages: response.totalPages,
        });
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [filters, pagination.currentPage, dataVersion]);

  const refreshData = () => {
    setDataVersion(currentVersion => currentVersion + 1);
  };

  const closeModal = () => {
    setOpenModal(false);
  }

  const openModalNewIssue = () => {
    setSelectedData({});
    setMode("create");
    setOpenModal(true);
  }

  const openModalViewIssue = (issueData) => {
    setSelectedData(issueData);
    setMode("view");
    setOpenModal(true);
  }

  const openModalEditIssue = (issueData) => {
    setSelectedData(issueData)
    setMode("edit");
    setOpenModal(true);
  }

  const onCreateIssue = async (issueData) => {
    const response = await createIssue(issueData);
  }

  const onEditIssue = async (id, issueData) => {
    const response = await updateIssue(id, issueData);
  }

  const handleSubmit = (issueData) => {
    if (mode == 'create') {
      onCreateIssue(issueData);
    } else {
      onEditIssue(issueData._id, issueData)
    }
    refreshData();
    closeModal();
  }

  const onDeleteIssue = async (id) => {
    const response = await deleteIssue(id);
    refreshData();
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const goToPage = (pageNumber) => {
    setPagination(prev => ({ ...prev, currentPage: pageNumber }));
  }

  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  const priorityOptions = [
    { value: '', label: 'All' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ color: "var(--color-text)" }}>Issues</h1>
      <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "end" }}>
        <Select
          name="priority"
          label="Priority"
          value={filters.priority}
          onChange={handleFilterChange}
          options={priorityOptions}
        />
        <Select
          name="status"
          label="Status"
          value={filters.status}
          onChange={handleFilterChange}
          options={statusOptions}
        />
      </div>
      <IssueModal isOpen={openModal} mode={mode} onClose={closeModal} onSubmit={handleSubmit} issueData={selectedData} />
      <FloatingBtn onClick={openModalNewIssue} />
      {loading ? <p>Loading...</p> : <IssueCardsContainer onCardClick={openModalViewIssue} onEdit={openModalEditIssue} onDelete={onDeleteIssue} issues={issues} />}
      <div className="pagination-container">
        <button
          onClick={() => goToPage(pagination.currentPage - 1)}
          disabled={pagination.currentPage <= 1}
        >
          Previous
        </button>
        <span>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={() => goToPage(pagination.currentPage + 1)}
          disabled={pagination.currentPage >= pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
