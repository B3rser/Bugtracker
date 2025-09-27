import React from 'react'
import { IssueCard } from '../Components/IssueCard';
import { getAllIssues } from '../Services/IssueService';
import { FloatingBtn } from '../Components/Buttons/FloatingBtn';
import { IssueModal } from '../Components/IssueModal';
import { Select } from '../Components/Select';

export function Home() {
  const [loading, setLoading] = React.useState(true);
  const [issues, setIssues] = React.useState([]);
  const [priority, setPriority] = React.useState('all'); // 'all', 'low', 'medium', 'high'
  const [status, setStatus] = React.useState('all'); // 'all', open, in_progress, done

  const [openModal, setOpenModal] = React.useState(false);
  const [mode, setMode] = React.useState('view'); // 'view', 'edit', 'create'

  React.useEffect(() => {
    document.title = 'Home'
    let issuesData = getAllIssues();

    issuesData.then(data => {
      console.log("Fetched issues:", data);
      setIssues(data);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to fetch issues:", err);
      setLoading(false);
    });

  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  const closeModal = () => {
    setOpenModal(false);
  }

  const openModalNewIssue = () => {
    setMode("create");
    setOpenModal(true);
  }

  const openModalViewIssue = () => {
    setMode("view");
    setOpenModal(true);
  }

  const openModalEditIssue = () => {
    setMode("edit");
    setOpenModal(true);
  }

  const deleteIssue = () => {

  }

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'All' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <>
      <h1 style={{ color: "var(--color-text)" }}>Issues</h1>
      <div>
        <Select
          label="Priority"
          value={priority}
          onChange={handlePriorityChange}
          options={priorityOptions}
        />
        <Select
          label="Status"
          value={status}
          onChange={handleStatusChange}
          options={statusOptions}
        />
      </div>
      <IssueModal isOpen={openModal} mode={mode} onClose={closeModal} onSubmit={() => { }} />
      <FloatingBtn onClick={openModalNewIssue} />
      <div className="issue-cards-container">
        {issues.map((issue) => <IssueCard issueData={issue} onCardClick={openModalViewIssue} onEdit={openModalEditIssue} onDelete={deleteIssue} key={issue._id} />)}
      </div>
    </>
  )
}
