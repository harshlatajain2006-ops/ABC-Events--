const EVENTS = [
    {
        id: '1',
        title: 'Mastering Job Hunts During Recession',
        date: 'February 20, 2024',
        time: '2:00 PM - 3:30 PM',
        location: 'Lab 116, CSE Department',
        description: 'Secrets to High-Paying Job Roles! Insider tips, strategies, and a roadmap to thrive professionally.',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800',
        category: 'Seminar',
        status: 'Past',
        sortDate: '2024-02-20',
    },
    {
        id: '2',
        title: 'Blockchain Event Winners Announcement',
        date: 'November 04, 2023',
        time: 'N/A',
        location: 'Acropolis Campus',
        description: 'Celebrating the brilliant minds and winners of our recent blockchain competition.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
        category: 'Meetup',
        status: 'Past',
        sortDate: '2023-11-04',
    },
    {
        id: '3',
        title: 'Community Interactions Session',
        date: 'October 11, 2023',
        time: 'N/A',
        location: 'Acropolis Campus',
        description: 'A vibrant session focused on community interactions, networking, and sharing blockchain insights.',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800',
        category: 'Meetup',
        status: 'Past',
        sortDate: '2023-10-11',
    },
    {
        id: '4',
        title: 'Code Block: Blockchain Journey',
        date: 'March 27, 2023',
        time: '10:30 AM - 1:30 PM',
        location: 'Lab 121, CSE Department',
        description: 'Learn to build your own D-app, NFT, and Smart Contracts with Mr. Uttam Singh from Flare Network.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        category: 'Workshop',
        status: 'Past',
        sortDate: '2023-03-27',
    },
    {
        id: '5',
        title: 'Private & Public Blockchain Use Cases',
        date: 'March 10, 2023',
        time: '7:00 PM',
        location: 'Virtual (Microsoft Teams)',
        description: 'Valuable insights on industry trends and real-world applications of private and public blockchains.',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
        category: 'Webinar',
        status: 'Past',
        sortDate: '2023-03-10',
    },
    {
        id: '6',
        title: 'Beginners Guide to LinkedIn',
        date: 'January 17, 2023',
        time: '8:00 PM - 9:00 PM',
        location: 'Virtual (Google Meet)',
        description: 'The very first event of ABC! Teaching basics of LinkedIn profile building and networking.',
        image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800',
        category: 'Webinar',
        status: 'Past',
        sortDate: '2023-01-17',
    },
];

function createEventCard(event) {
    return `
        <div class="event-card bg-card-bg rounded-2xl overflow-hidden border border-border-light card-shadow group">
            <div class="relative h-48 overflow-hidden event-image-container">
                <img 
                    src="${event.image}" 
                    alt="${event.title}"
                    class="w-full h-full object-cover"
                >
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 rounded-full bg-bg-main/80 backdrop-blur-md text-[10px] font-bold text-accent-primary uppercase tracking-wider border border-accent-primary/20">
                        ${event.category}
                    </span>
                </div>
            </div>
            
            <div class="p-6">
                <div class="flex items-center gap-2 text-accent-primary text-xs font-bold mb-2">
                    <i class="fa-regular fa-calendar w-3 h-3"></i>
                    ${event.date}
                </div>
                <h3 class="text-xl font-bold mb-3 group-hover:text-accent-primary transition-colors line-clamp-1 text-text-main">${event.title}</h3>
                <p class="text-text-secondary text-sm mb-6 line-clamp-2 leading-relaxed">
                    ${event.description}
                </p>
                
                <div class="flex flex-col gap-3 pt-4 border-t border-border-light">
                    <div class="flex items-center gap-2 text-text-secondary text-xs">
                        <i class="fa-solid fa-map-pin w-3 h-3 text-accent-primary"></i>
                        ${event.location}
                    </div>
                    <div class="flex items-center gap-2 text-text-secondary text-xs">
                        <i class="fa-regular fa-clock w-3 h-3 text-accent-primary"></i>
                        ${event.time}
                    </div>
                </div>
                
                <button class="mt-6 w-full py-2.5 rounded-lg border border-accent-primary text-accent-primary font-bold text-sm hover:bg-accent-primary hover:text-bg-main transition-all flex items-center justify-center gap-2">
                    View Details <i class="fa-solid fa-chevron-right w-4 h-4"></i>
                </button>
            </div>
        </div>
    `;
}

function renderEvents(filter = '') {
    const upcomingGrid = document.getElementById('upcomingEventsGrid');
    const pastGrid = document.getElementById('pastEventsGrid');
    const noUpcoming = document.getElementById('noUpcomingEvents');
    const noPast = document.getElementById('noPastEvents');

    const filtered = EVENTS.filter(e =>
        e.title.toLowerCase().includes(filter.toLowerCase()) ||
        e.category.toLowerCase().includes(filter.toLowerCase())
    );

    const upcoming = filtered.filter(e => e.status === 'Upcoming').sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));
    const past = filtered.filter(e => e.status === 'Past').sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

    upcomingGrid.innerHTML = upcoming.map(createEventCard).join('');
    pastGrid.innerHTML = past.map(createEventCard).join('');

    if (upcoming.length === 0) noUpcoming.classList.remove('hidden');
    else noUpcoming.classList.add('hidden');

    if (past.length === 0) noPast.classList.remove('hidden');
    else noPast.classList.add('hidden');
}

document.getElementById('eventSearch').addEventListener('input', (e) => {
    renderEvents(e.target.value);
});

// Initial render
renderEvents();
