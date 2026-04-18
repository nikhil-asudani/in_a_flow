export type Signal = "Optimal" | "Underutilized" | "Overloaded"
export type EffortLevel = "Low" | "Medium" | "High" | "Very High" | "Need to Scope"
export type TaskStatus = "working" | "overdue" | "blocked" | "unscoped"
export type CalendarEventType = 
  | "pto" 
  | "vto" 
  | "holiday" 
  | "floater" 
  | "birthday" 
  | "anniversary" 
  | "appointment" 
  | "qbr" 
  | "event"

export interface CalendarEvent {
  dayOffset: number // 0 = today, positive = future days
  type: CalendarEventType
  label: string // e.g. "Apr 23"
}

export interface Task {
  name: string
  dueDate: string | null
  effort: EffortLevel
  status: TaskStatus
}

export interface Metrics {
  activeTasks: number
  activePoints: number
  overdueTasks: number
  overduePoints: number
  unscopedTasks: number
  blockedTasks: number
  loadRatio: number
  throughput: number
}

export interface ChartData {
  overdueData: number[] // 15 days in the past (index 0 = -15, index 14 = -1)
  futureData: number[] // 16 days (index 0 = today, index 15 = +15)
  backlogBeyond15Days: { tasks: number; points: number } | null
}

export interface Analyst {
  id: string
  name: string
  initials: string
  role: string
  signal: Signal
  metrics: Metrics
  chartData: ChartData
  tasks: Task[]
  calendarEvents: CalendarEvent[]
}

export const analysts: Analyst[] = [
  {
    id: "1",
    name: "Nikhil K.",
    initials: "NK",
    role: "Senior analyst — Bealls, Bassett",
    signal: "Overloaded",
    metrics: {
      activeTasks: 4,
      activePoints: 19,
      overdueTasks: 3,
      overduePoints: 8,
      unscopedTasks: 2,
      blockedTasks: 4,
      loadRatio: 1.50,
      throughput: 18,
    },
    chartData: {
      overdueData: [0, 0, 0, 0, 0, 0, 1.7, 2.5, 1.7, 0, 0, 3.0, 2.5, 1.5, 1.0],
      futureData: [2.5, 3.2, 5.0, 5.5, 1.4, 4.1, 5.8, 3.5, 1.0, 0, 2.8, 1.5, 0, 0, 0, 0],
      backlogBeyond15Days: { tasks: 2, points: 6 },
    },
    calendarEvents: [
      { dayOffset: 0, type: "anniversary", label: "Apr 18" },
      { dayOffset: 4, type: "appointment", label: "Apr 22" },
      { dayOffset: 5, type: "pto", label: "Apr 23" },
      { dayOffset: 7, type: "birthday", label: "Apr 25" },
    ],
    tasks: [
      { name: "Bealls comp store analysis", dueDate: "Apr 22", effort: "High", status: "working" },
      { name: "Bassett new mover NCOA", dueDate: "Apr 24", effort: "High", status: "working" },
      { name: "Weekly KPI email automation", dueDate: "Apr 21", effort: "Medium", status: "working" },
      { name: "Retention rate report setup", dueDate: "Apr 25", effort: "Medium", status: "working" },
      { name: "Monthly email draft — April", dueDate: "Apr 28", effort: "Low", status: "working" },
      { name: "Store closure narrative — Q1", dueDate: "Apr 8", effort: "Medium", status: "overdue" },
      { name: "Contactability pipeline doc", dueDate: "Apr 12", effort: "High", status: "overdue" },
      { name: "Ad hoc Claritas pull", dueDate: "Apr 14", effort: "Low", status: "overdue" },
      { name: "Pending: Client data from Bealls", dueDate: "Apr 15", effort: "Medium", status: "blocked" },
      { name: "Pending: Bassett store list confirmation", dueDate: "Apr 10", effort: "Low", status: "blocked" },
      { name: "Awaiting: Creative assets from agency", dueDate: "Apr 16", effort: "Medium", status: "blocked" },
      { name: "On Hold: Loyalty tier migration", dueDate: "Apr 9", effort: "High", status: "blocked" },
      { name: "Client data request — ad hoc", dueDate: null, effort: "Need to Scope", status: "unscoped" },
      { name: "Demographic analysis — scoping", dueDate: null, effort: "Need to Scope", status: "unscoped" },
    ],
  },
  {
    id: "2",
    name: "Aditi P.",
    initials: "AP",
    role: "Analyst — Bealls",
    signal: "Optimal",
    metrics: {
      activeTasks: 4,
      activePoints: 14,
      overdueTasks: 0,
      overduePoints: 0,
      unscopedTasks: 0,
      blockedTasks: 1,
      loadRatio: 0.88,
      throughput: 16,
    },
    chartData: {
      overdueData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      futureData: [1.5, 1.5, 0, 3.0, 3.0, 2.0, 2.0, 1.0, 1.0, 0, 0, 1.5, 1.5, 0, 0, 0],
      backlogBeyond15Days: null,
    },
    calendarEvents: [
      { dayOffset: 3, type: "birthday", label: "Apr 21" },
    ],
    tasks: [
      { name: "Bealls weekly data check", dueDate: "Apr 21", effort: "Medium", status: "working" },
      { name: "Email campaign holdout report", dueDate: "Apr 23", effort: "High", status: "working" },
      { name: "Loyalty tier migration query", dueDate: "Apr 25", effort: "Low", status: "working" },
      { name: "Spring promo post-analysis", dueDate: "Apr 29", effort: "Medium", status: "working" },
      { name: "Pending: Promo codes from marketing", dueDate: "Apr 18", effort: "Low", status: "blocked" },
    ],
  },
  {
    id: "3",
    name: "Rahul S.",
    initials: "RS",
    role: "Analyst — Bassett, Bealls",
    signal: "Underutilized",
    metrics: {
      activeTasks: 3,
      activePoints: 7,
      overdueTasks: 0,
      overduePoints: 0,
      unscopedTasks: 1,
      blockedTasks: 0,
      loadRatio: 0.47,
      throughput: 15,
    },
    chartData: {
      overdueData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      futureData: [0, 1.0, 0, 2.0, 1.5, 1.0, 1.0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0],
      backlogBeyond15Days: null,
    },
    calendarEvents: [],
    tasks: [
      { name: "Bassett store list cleanup", dueDate: "Apr 22", effort: "Medium", status: "working" },
      { name: "Ad hoc data pull — regional", dueDate: "Apr 21", effort: "Low", status: "working" },
      { name: "Customer classification review", dueDate: "Apr 28", effort: "Low", status: "working" },
      { name: "New dashboard exploration", dueDate: null, effort: "Need to Scope", status: "unscoped" },
    ],
  },
  {
    id: "4",
    name: "Meera J.",
    initials: "MJ",
    role: "Senior analyst — Bassett",
    signal: "Optimal",
    metrics: {
      activeTasks: 5,
      activePoints: 19,
      overdueTasks: 1,
      overduePoints: 3,
      unscopedTasks: 0,
      blockedTasks: 0,
      loadRatio: 0.95,
      throughput: 20,
    },
    chartData: {
      overdueData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.5, 1.5, 0],
      futureData: [2.0, 2.5, 0, 3.5, 3.5, 2.5, 3.0, 2.0, 0.5, 0, 1.5, 1.0, 0, 0, 0, 0],
      backlogBeyond15Days: null,
    },
    calendarEvents: [
      { dayOffset: 4, type: "appointment", label: "Apr 22" },
      { dayOffset: 6, type: "pto", label: "Apr 24" },
    ],
    tasks: [
      { name: "Bassett store deep-dive (Houston)", dueDate: "Apr 23", effort: "High", status: "working" },
      { name: "New mover direct mail reconciliation", dueDate: "Apr 24", effort: "Medium", status: "working" },
      { name: "Demographic overlay analysis", dueDate: "Apr 26", effort: "Medium", status: "working" },
      { name: "Monthly reporting template", dueDate: "Apr 28", effort: "Medium", status: "working" },
      { name: "Data validation — April refresh", dueDate: "Apr 22", effort: "Low", status: "working" },
      { name: "Sales variance formatting", dueDate: "Apr 15", effort: "Medium", status: "overdue" },
    ],
  },
  {
    id: "5",
    name: "Vikram T.",
    initials: "VT",
    role: "Analyst — Bealls",
    signal: "Optimal",
    metrics: {
      activeTasks: 3,
      activePoints: 11,
      overdueTasks: 0,
      overduePoints: 0,
      unscopedTasks: 0,
      blockedTasks: 2,
      loadRatio: 0.92,
      throughput: 12,
    },
    chartData: {
      overdueData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      futureData: [1.5, 2.0, 0, 3.0, 2.5, 1.0, 1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backlogBeyond15Days: null,
    },
    calendarEvents: [],
    tasks: [
      { name: "Bealls contactability pipeline QA", dueDate: "Apr 23", effort: "High", status: "working" },
      { name: "Weekly KPI chart updates", dueDate: "Apr 21", effort: "Medium", status: "working" },
      { name: "Claritas address cleaning — batch 4", dueDate: "Apr 25", effort: "Low", status: "working" },
      { name: "Pending: Store data from IT", dueDate: "Apr 17", effort: "Medium", status: "blocked" },
      { name: "Awaiting: Vendor file delivery", dueDate: "Apr 16", effort: "Low", status: "blocked" },
    ],
  },
  {
    id: "6",
    name: "Kavya D.",
    initials: "KD",
    role: "Junior analyst — Bealls",
    signal: "Underutilized",
    metrics: {
      activeTasks: 2,
      activePoints: 4,
      overdueTasks: 0,
      overduePoints: 0,
      unscopedTasks: 0,
      blockedTasks: 0,
      loadRatio: 0.40,
      throughput: 10,
    },
    chartData: {
      overdueData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      futureData: [0, 1.0, 0, 1.0, 1.0, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backlogBeyond15Days: null,
    },
    calendarEvents: [],
    tasks: [
      { name: "Store closure guest tracking — format", dueDate: "Apr 24", effort: "Medium", status: "working" },
      { name: "Monthly comp store list refresh", dueDate: "Apr 26", effort: "Low", status: "working" },
    ],
  },
]
