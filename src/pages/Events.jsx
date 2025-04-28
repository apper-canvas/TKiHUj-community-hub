import React, { useState } from "react";
import { Calendar, MapPin, Clock, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isToday, isSameDay } from "date-fns";

const Events = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // "month" or "list"
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Community Meeting",
      date: new Date(2023, 5, 18, 15, 0),
      location: "Community Center",
      description: "Monthly community meeting to discuss upcoming projects and initiatives.",
      type: "meeting",
    },
    {
      id: 2,
      title: "Summer Picnic",
      date: new Date(2023, 5, 24, 12, 0),
      location: "Central Park",
      description: "Annual summer picnic for all community members. Bring your family and enjoy food, games, and music!",
      type: "social",
    },
    {
      id: 3,
      title: "Neighborhood Cleanup",
      date: new Date(2023, 5, 15, 9, 0),
      location: "Main Street",
      description: "Volunteer event to clean up our neighborhood. Supplies will be provided.",
      type: "volunteer",
    },
    {
      id: 4,
      title: "Board Election",
      date: new Date(2023, 5, 30, 18, 0),
      location: "Online",
      description: "Annual board member election meeting. All residents are encouraged to attend and vote.",
      type: "meeting",
    },
    {
      id: 5,
      title: "Kids Fun Day",
      date: new Date(2023, 5, 20, 10, 0),
      location: "Community Park",
      description: "A day filled with games, activities, and entertainment for children of all ages.",
      type: "social",
    },
  ];
  
  // Functions for calendar navigation
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Function to get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(event.date, date));
  };
  
  // Function to render the calendar grid
  const renderCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = monthStart;
    const endDate = monthEnd;
    
    const dateFormat = "d";
    const days = [];
    
    const daysInMonth = eachDayOfInterval({
      start: startDate,
      end: endDate
    });
    
    // Get day names
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Create header row with day names
    const dayNamesRow = dayNames.map((day, index) => (
      <div key={index} className="text-center font-medium text-gray-500 py-2">
        {day}
      </div>
    ));
    days.push(<div key="header" className="grid grid-cols-7">{dayNamesRow}</div>);
    
    // Calculate the start position for the first day of the month
    let firstDayOfMonthIndex = getDay(monthStart);
    
    // Create calendar grid
    let daysGrid = [];
    
    // Add empty cells for days before the start of the month
    for (let i = 0; i < firstDayOfMonthIndex; i++) {
      daysGrid.push(
        <div key={`empty-${i}`} className="h-24 border p-1 bg-gray-50"></div>
      );
    }
    
    // Add cells for each day of the month
    daysInMonth.forEach((day, dayIndex) => {
      const dayEvents = getEventsForDate(day);
      const isCurrentMonth = isSameMonth(day, currentMonth);
      const isSelected = isSameDay(day, selectedDate);
      const isCurrentDay = isToday(day);
      
      daysGrid.push(
        <div 
          key={dayIndex} 
          className={`h-24 border p-1 relative ${
            !isCurrentMonth ? 'bg-gray-50' : 
            isSelected ? 'bg-blue-50' : ''
          }`}
          onClick={() => setSelectedDate(day)}
        >
          <div className={`absolute top-1 right-1 rounded-full h-6 w-6 flex items-center justify-center ${
            isCurrentDay ? 'bg-blue-500 text-white' : ''
          }`}>
            {format(day, dateFormat)}
          </div>
          <div className="mt-6 space-y-1 overflow-hidden">
            {dayEvents.map((event, eventIndex) => (
              <div 
                key={eventIndex}
                className={`text-xs truncate rounded px-1 py-0.5 ${
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'social' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                }`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    });
    
    // Add empty cells for days after the end of the month to complete the grid
    const totalCellsInGrid = 42; // 6 rows of 7 days
    const remainingCells = totalCellsInGrid - (firstDayOfMonthIndex + daysInMonth.length);
    
    for (let i = 0; i < remainingCells; i++) {
      daysGrid.push(
        <div key={`empty-end-${i}`} className="h-24 border p-1 bg-gray-50"></div>
      );
    }
    
    // Create rows with 7 days each
    const rows = [];
    let cells = [];
    
    daysGrid.forEach((cell, i) => {
      if (i % 7 !== 0) {
        cells.push(cell);
      } else {
        rows.push(cells);
        cells = [cell];
      }
      if (i === daysGrid.length - 1) {
        rows.push(cells);
      }
    });
    
    // Skip the first empty array
    const calendarRows = rows.slice(1).map((row, i) => (
      <div key={i} className="grid grid-cols-7">
        {row}
      </div>
    ));
    
    days.push(...calendarRows);
    
    return days;
  };
  
  // Get events for the selected date
  const selectedDateEvents = getEventsForDate(selectedDate);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-gray-600 mt-2">Browse and manage community events</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} className="mr-2" />
          Create Event
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded ${viewMode === 'month' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
          
          <div className="flex items-center">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-bold px-4">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex items-center">
            <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        {viewMode === 'month' ? (
          <div className="p-4">
            {renderCalendarDays()}
          </div>
        ) : (
          <div className="p-4">
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col items-center justify-center h-16 w-16 rounded-lg bg-blue-100 text-blue-800 shrink-0">
                      <span className="text-sm font-medium">{format(event.date, 'MMM')}</span>
                      <span className="text-2xl font-bold">{format(event.date, 'd')}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <div className="mt-2 flex flex-col gap-1">
                        <div className="flex items-center text-gray-600">
                          <Clock size={16} className="mr-1" />
                          <span>{format(event.date, 'h:mm a')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-1" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'social' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-600">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {viewMode === 'month' && selectedDateEvents.length > 0 && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Events on {format(selectedDate, 'MMMM d, yyyy')}</h2>
          </div>
          
          <div className="p-4 space-y-4">
            {selectedDateEvents.map(event => (
              <div key={event.id} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-1" />
                    <span>{format(event.date, 'h:mm a')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{event.location}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'social' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
                <p className="mt-3 text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;