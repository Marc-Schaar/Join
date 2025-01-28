let dummyContacts = [
    {
        name: "Luca Rossi",
        email: "luca.rossi@email.com",
        phone: "+39 123 456 789",
        color: "#FF5733",
    },
    {
        name: "Marco Bianchi",
        email: "marco.bianchi@email.com",
        phone: "+39 234 567 890",
        color: "#33FF57",
    },
    {
        name: "Emily Müller",
        email: "emily.mueller@email.com",
        phone: "+49 170 123 4567",
        color: "#5733FF",
    },
    {
        name: "Johan de Vries",
        email: "johan.devries@email.com",
        phone: "+31 20 123 4567",
        color: "#FF33A1",
    },
    {
        name: "Keiko Tanaka",
        email: "keiko.tanaka@email.com",
        phone: "+81 90 1234 5678",
        color: "#F7FF33",
    },
    {
        name: "Aminata Diallo",
        email: "aminata.diallo@email.com",
        phone: "+221 77 123 4567",
        color: "#33C1FF",
    },
    {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 202 555 0123",
        color: "#FF8433",
    },
    {
        name: "Zara Ali",
        email: "zara.ali@email.com",
        phone: "+233 24 123 4567",
        color: "#33FFEC",
    },
    {
        name: "Daniel Schmidt",
        email: "daniel.schmidt@email.com",
        phone: "+49 151 234 5678",
        color: "#FF5733",
    },
    {
        name: "Sophia van der Meer",
        email: "sophia.vandermeer@email.com",
        phone: "+31 6 234 56789",
        color: "#4DFF33",
    },
    {
        name: "Olga Petrova",
        email: "olga.petrova@email.com",
        phone: "+7 900 123 4567",
        color: "#FF3333",
    },
    {
        name: "Carlos González",
        email: "carlos.gonzalez@email.com",
        phone: "+34 600 123 456",
        color: "#FFE033",
    },
    {
        name: "Kwame Osei",
        email: "kwame.osei@email.com",
        phone: "+233 27 765 4321",
        color: "#33FF72",
    },
    {
        name: "Liam O'Connor",
        email: "liam.oconnor@email.com",
        phone: "+1 415 555 9876",
        color: "#3333FF",
    },
    {
        name: "Taro Yamada",
        email: "taro.yamada@email.com",
        phone: "+81 80 2345 6789",
        color: "#FF9F33",
    },
];

let dummyTask = [
    {
        title: "Implement Login Feature",
        description:
            "Implement the login feature with email and password authentication.",
        date: "2025-02-01",
        assignedTo: undefined,
        categoryText: "Technical Task",
        category: "progress",
        prio: "urgent",
        subtask: [
            { checked: false, sub: "Create login UI" },
            { checked: false, sub: "Implement backend API for authentication" },
            { checked: false, sub: "Integrate UI with backend" },
        ],
    },
    {
        title: "Design Home Page",
        description:
            "Design the layout for the homepage, including header, footer, and main sections.",
        date: "2025-02-02",
        assignedTo: undefined,
        categoryText: "User Story",
        category: "todo",
        prio: "medium",
        subtask: [
            { checked: false, sub: "Sketch wireframe" },
            { checked: false, sub: "Review design with the team" },
        ],
    },
    {
        title: "Set Up Database",
        description:
            "Set up the database and tables for storing user data and task information.",
        date: "2025-02-03",
        assignedTo: undefined,
        categoryText: "Technical Task",
        category: "progress",
        prio: "urgent",
        subtask: [],
    },
    {
        title: "Write API Documentation",
        description:
            "Write comprehensive documentation for the API endpoints for the project.",
        date: "2025-02-04",
        assignedTo: undefined,
        categoryText: "Technical Task",
        category: "feedback",
        prio: "medium",
        subtask: [
            { checked: false, sub: "List all available API endpoints" },
            { checked: false, sub: "Add example request/response" },
            { checked: false, sub: "Write authentication guide" },
            { checked: false, sub: "Describe error handling" },
        ],
    },
    {
        title: "User Authentication Testing",
        description:
            "Test user authentication functionality to ensure it is working correctly.",
        date: "2025-02-05",
        assignedTo: undefined,
        categoryText: "User Story",
        category: "todo",
        prio: "urgent",
        subtask: [
            { checked: false, sub: "Test login with correct credentials" },
            { checked: false, sub: "Test login with incorrect credentials" },
            { checked: false, sub: "Test forgot password flow" },
        ],
    },
    {
        title: "Refactor CSS for Homepage",
        description:
            "Refactor the CSS code for the homepage to improve readability and performance.",
        date: "2025-02-06",
        assignedTo: undefined,
        categoryText: "Technical Task",
        category: "progress",
        prio: "medium",
        subtask: [
            { checked: false, sub: "Identify redundant styles" },
            { checked: false, sub: "Consolidate CSS selectors" },
            { checked: false, sub: "Test changes across browsers" },
            { checked: false, sub: "Ensure mobile responsiveness" },
        ],
    },
    {
        title: "Write Unit Tests for API",
        description:
            "Write unit tests to ensure the API endpoints are working as expected.",
        date: "2025-02-07",
        assignedTo: undefined,
        categoryText: "Technical Task",
        category: "todo",
        prio: "urgent",
        subtask: [
            { checked: false, sub: "Write tests for authentication endpoint" },
            { checked: false, sub: "Write tests for data retrieval endpoint" },
            { checked: false, sub: "Run tests and fix failing ones" },
            { checked: false, sub: "Test edge cases" },
        ],
    },
    {
        title: "Create User Stories for Features",
        description:
            "Create user stories for the upcoming features in the project.",
        date: "2025-02-08",
        assignedTo: undefined,
        categoryText: "User Story",
        category: "feedback",
        prio: "low",
        subtask: [
            { checked: false, sub: "Write user story for login" },
            { checked: false, sub: "Write user story for profile update" },
            { checked: false, sub: "Write user story for settings page" },
            { checked: false, sub: "Write user story for notifications" },
        ],
    },
    {
        title: "Implement Profile Page",
        description:
            "Implement the profile page where users can view and update their information.",
        date: "2025-02-09",
        assignedTo: undefined,
        categoryText: "Technical Task",
        category: "todo",
        prio: "medium",
        subtask: [
            { checked: false, sub: "Create profile UI" },
            { checked: false, sub: "Integrate API for user data" },
            { checked: false, sub: "Test profile page functionality" },
            { checked: false, sub: "Add image upload feature" },
        ],
    },
    {
        title: "Deploy to Staging Environment",
        description:
            "Deploy the latest code to the staging environment for testing.",
        date: "2025-02-10",
        assignedTo: undefined,
        categoryText: "Technical Task",
        category: "done",
        prio: "urgent",
        subtask: [],
    },
];

async function postDummyContacts() {
    for (let i = 0; i < dummyContacts.length; i++) {
        let contact = dummyContacts[i];
        await postData(
            (path = "contacts"),
            (data = {
                name: `${contact.name}`,
                email: `${contact.email}`,
                phone: `${contact.phone}`,
                color: `${contact.color}`,
            })
        );
    }
}

async function postDummyTasks() {
    for (let i = 0; i < dummyTask.length; i++) {
        let task = dummyTask[i];
        await postData(
            (path = "/tasks"),
            (data = {
                title: task.title,
                description: task.description,
                date: task.date,
                assignedTo: task.assignedTo,
                category: task.category,
                prio: task.prio,
                categoryText: task.categoryText,
                subtask: task.subtask,
            })
        );
    }
}
