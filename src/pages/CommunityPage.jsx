import { useState } from 'react'
import data from '../data/community.json'
import { useAuth } from '../context/AuthContext.jsx'

export default function CommunityPage() {
  const { user } = useAuth()
  const [activeChannel, setActiveChannel] = useState('General')

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        <aside className="col-span-3 bg-white rounded-lg shadow-card p-5 h-fit">
          <ul className="text-sm text-navy space-y-2 mb-6">
            <li>@ Mentions</li>
            <li>💬 Replies</li>
          </ul>

          <h4 className="text-xs font-bold text-navy mb-2">▲ SPACES</h4>
          <div className="bg-cyan/10 text-navy text-sm px-3 py-2 rounded mb-4"># General</div>

          <h4 className="text-xs font-bold text-navy mb-2">▲ COURSE DISCUSSIONS</h4>
          <ul className="space-y-1 text-xs text-navy">
            {data.courseDiscussions.map((d, i) => (
              <li key={i} className="flex items-center justify-between py-1 hover:bg-gray-50 px-2 rounded">
                <span className="flex items-center gap-1 truncate">
                  <span>📚</span>
                  <span className="truncate">{d.title}</span>
                </span>
                {d.unread > 0 && <span className="bg-cyan text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{d.unread}</span>}
              </li>
            ))}
          </ul>
        </aside>

        {/* CENTER */}
        <main className="col-span-6 bg-white rounded-lg shadow-card p-6">
          <h3 className="text-navy font-semibold mb-4"># {activeChannel}</h3>

          <div className="bg-gray-50 rounded p-3 mb-6">
            <div className="flex gap-2 mb-2">
              <img src={`https://i.pravatar.cc/40?u=${user?.email || 'guest'}`} className="w-8 h-8 rounded-full" />
              <input
                placeholder="Type something or click on the stars button to write with AI"
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-sm pl-10">
              <span>Aa</span><span>😊</span><span>@</span><span>📎</span><span>▤</span><span>📊</span><span>✨</span>
              <button className="ml-auto bg-cyan text-white text-xs px-3 py-1 rounded">share</button>
            </div>
          </div>

          <div className="flex justify-end text-xs text-gray-500 mb-4">
            Sort by: <span className="text-navy font-medium ml-1">Newest activity first ▾</span>
          </div>

          {data.posts.map((p) => (
            <div key={p.id} className="border-t pt-4">
              <div className="flex items-start gap-3">
                <img src={p.avatar} className="w-9 h-9 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-navy text-sm">{p.author}</span>
                    <span className="text-xs text-gray-400">{p.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-800 mt-1">{p.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                    <span>♥ {p.likes}</span>
                    <span>💬 {p.replies}</span>
                    <span>🗨 {p.comments}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pl-2">
                    <img src={`https://i.pravatar.cc/30?u=${user?.email || 'guest'}`} className="w-6 h-6 rounded-full" />
                    <input placeholder="add a comment" className="flex-1 bg-gray-50 rounded text-xs px-3 py-2 outline-none" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="col-span-3 space-y-4">
          <div className="bg-white rounded-lg shadow-card p-3">
            <input placeholder="search for posts" className="w-full text-sm outline-none px-2 py-1" />
          </div>
          <div className="bg-white rounded-lg shadow-card p-4">
            <h4 className="text-xs font-bold text-navy mb-3">Online members in space</h4>
            {data.onlineMembers.map((m) => (
              <div key={m.name} className="flex items-center gap-2 text-sm text-navy">
                <img src={m.avatar} className="w-8 h-8 rounded-full" />
                <span>{m.name}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}