import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "../components/card"
import { ChatMessages } from "../components/chatmassage"
import { MessageInput } from "../components/massageInput"
import { UserList } from "../components/userlist"

export default function ChatApp() {
  const [users, setUsers] = useState([])  // Initially empty until we fetch data
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/e0d8a81b-6610-45b7-9215-97532399b18d')
        const data = await response.json()

        setUsers(data.users)
        setMessages(data.messages)

        if (data.users.length > 0) {
          setSelectedUser(data.users[0])
        }
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }

    fetchData()
  }, [])  

  const handleSendMessage = (text) => {
    if (selectedUser) {
      const newMessage = {
        id: messages[selectedUser.id]?.length + 1 || 1,
        text,
        sender: "You",
      }

      setMessages((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
      }))
    }
  }

  return (
    <>
    
    <Card className="bg-gray-80 h-screen">
      <CardHeader className="border-b bg-gray-200">
        <h1 className="text-xl font-bold">Chat app by Zayyan</h1>
      </CardHeader>
      <CardContent className="p-0 flex flex-col lg:flex-row">

        <div className="lg:w-1/3 w-full lg:h-full">
          <UserList 
            users={users} 
            selectedUser={selectedUser} 
            onSelectUser={setSelectedUser} 
          />
        </div>
        
            <div className={`flex-1 flex flex-col ${selectedUser ? 'block' : 'hidden lg:block'}`}>
          {selectedUser && (
            <>
              <ChatMessages messages={messages[selectedUser.id] || []} currentUser="You" />
              <MessageInput onSendMessage={handleSendMessage} />
            </>
          )}
        </div>
      </CardContent>
    </Card>
    </>
  )
}
