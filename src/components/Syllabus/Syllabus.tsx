import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SyllabusItem } from '../../types';
import syllabusData from '../../data/syllabus.json';

export function Syllabus() {
  const { userProfile } = useAuth();
  const [syllabus, setSyllabus] = useState<SyllabusItem[]>([]);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile) {
      const classSyllabus = syllabusData.filter(
        item => item.class_level === userProfile.class_level
      );
      setSyllabus(classSyllabus);
    }
  }, [userProfile]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Class {userProfile?.class_level} Syllabus
        </h1>
        <p className="text-gray-600">NCERT Mathematics Curriculum</p>
      </div>

      <div className="space-y-4">
        {syllabus.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <button
              onClick={() => setExpandedChapter(
                expandedChapter === item.id ? null : item.id
              )}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.chapter}</h3>
                  <p className="text-sm text-gray-500">{item.topics.length} topics</p>
                </div>
              </div>
              <ChevronRight 
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  expandedChapter === item.id ? 'rotate-90' : ''
                }`} 
              />
            </button>

            {expandedChapter === item.id && (
              <div className="px-6 pb-6">
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Topics Covered:</h4>
                  <div className="space-y-2">
                    {item.topics.map((topic, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-600 mb-4">
          AI-generated questions tailored to your learning progress and weak areas.
        </p>
        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Feature in Development
        </div>
      </div>
    </div>
  );
}