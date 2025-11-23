'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Trophy, Heart, Code, Palette, Music, BookOpen, Beaker, Camera } from 'lucide-react';

// Sample club data
const clubsData = [
  {
    id: 1,
    name: 'Coding Club',
    icon: Code,
    description: 'Learn programming, build projects, and participate in hackathons. Perfect for aspiring developers!',
    members: 150,
    events: 24,
    category: 'Technology',
    color: 'from-blue-500 to-cyan-500',
    established: '2020',
    president: 'Alex Johnson'
  },
  {
    id: 2,
    name: 'Art & Design Society',
    icon: Palette,
    description: 'Express your creativity through various art forms, exhibitions, and design workshops.',
    members: 95,
    events: 18,
    category: 'Arts',
    color: 'from-purple-500 to-pink-500',
    established: '2019',
    president: 'Sarah Chen'
  },
  {
    id: 3,
    name: 'Music Club',
    icon: Music,
    description: 'For music enthusiasts! Jam sessions, concerts, and learning instruments together.',
    members: 120,
    events: 32,
    category: 'Arts',
    color: 'from-red-500 to-orange-500',
    established: '2018',
    president: 'Marcus Williams'
  },
  {
    id: 4,
    name: 'Literature Society',
    icon: BookOpen,
    description: 'Explore the world of books, poetry, and creative writing through discussions and events.',
    members: 80,
    events: 15,
    category: 'Academic',
    color: 'from-green-500 to-teal-500',
    established: '2017',
    president: 'Emily Rodriguez'
  },
  {
    id: 5,
    name: 'Science Club',
    icon: Beaker,
    description: 'Conduct experiments, attend science fairs, and explore the wonders of science.',
    members: 110,
    events: 20,
    category: 'Academic',
    color: 'from-indigo-500 to-blue-500',
    established: '2019',
    president: 'David Park'
  },
  {
    id: 6,
    name: 'Photography Club',
    icon: Camera,
    description: 'Capture moments, learn photography techniques, and showcase your work in exhibitions.',
    members: 85,
    events: 16,
    category: 'Arts',
    color: 'from-yellow-500 to-amber-500',
    established: '2020',
    president: 'Lisa Thompson'
  },
  {
    id: 7,
    name: 'Sports Club',
    icon: Trophy,
    description: 'Stay active and competitive! Participate in tournaments, fitness sessions, and team sports.',
    members: 200,
    events: 45,
    category: 'Sports',
    color: 'from-emerald-500 to-green-500',
    established: '2016',
    president: 'James Miller'
  },
  {
    id: 8,
    name: 'Community Service',
    icon: Heart,
    description: 'Make a difference! Volunteer for social causes and help the community.',
    members: 130,
    events: 28,
    category: 'Social',
    color: 'from-rose-500 to-pink-500',
    established: '2018',
    president: 'Maya Patel'
  }
];

const categories = ['All', 'Technology', 'Arts', 'Academic', 'Sports', 'Social'];

export default function ClubsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClubs = clubsData.filter(club => {
    const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Explore Our Clubs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join a community of passionate students. Find your place and make lasting connections!
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Search clubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md mx-auto block px-6 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Clubs</p>
                <p className="text-3xl font-bold">{clubsData.length}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Members</p>
                <p className="text-3xl font-bold">{clubsData.reduce((acc, club) => acc + club.members, 0)}</p>
              </div>
              <Users className="w-12 h-12 text-purple-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Events</p>
                <p className="text-3xl font-bold">{clubsData.reduce((acc, club) => acc + club.events, 0)}</p>
              </div>
              <Calendar className="w-12 h-12 text-green-500 opacity-50" />
            </div>
          </div>
        </motion.div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club, index) => {
            const IconComponent = club.icon;
            return (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient Header */}
                <div className={`h-32 bg-gradient-to-r ${club.color} relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{club.name}</h3>
                      <p className="text-white/80 text-sm">Est. {club.established}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {club.category}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {club.description}
                  </p>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{club.members} Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{club.events} Events</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      President: <span className="font-medium text-foreground">{club.president}</span>
                    </p>
                    <button className={`w-full py-2 px-4 rounded-lg font-medium bg-gradient-to-r ${club.color} text-white hover:opacity-90 transition-opacity`}>
                      Join Club
                    </button>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${club.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredClubs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-muted-foreground">No clubs found matching your criteria</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}