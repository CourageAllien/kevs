"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send,
  MessageCircle,
  Clock,
  Check,
  CheckCheck
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo conversations
const conversations = [
  {
    id: 1,
    table: "Table 3",
    customer: "John",
    unread: 2,
    lastMessage: "Could we get some more water please?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 2),
    messages: [
      { id: 1, sender: "customer", text: "Hi! We're ready to order", time: new Date(Date.now() - 1000 * 60 * 30), read: true },
      { id: 2, sender: "waiter", text: "I'll be right there!", time: new Date(Date.now() - 1000 * 60 * 29), read: true },
      { id: 3, sender: "customer", text: "Thank you for the recommendations!", time: new Date(Date.now() - 1000 * 60 * 15), read: true },
      { id: 4, sender: "customer", text: "The food is amazing!", time: new Date(Date.now() - 1000 * 60 * 5), read: false },
      { id: 5, sender: "customer", text: "Could we get some more water please?", time: new Date(Date.now() - 1000 * 60 * 2), read: false },
    ],
  },
  {
    id: 2,
    table: "Table 7",
    customer: "Mike",
    unread: 1,
    lastMessage: "Is the pizza ready?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    messages: [
      { id: 1, sender: "customer", text: "How long for the pizza?", time: new Date(Date.now() - 1000 * 60 * 10), read: true },
      { id: 2, sender: "waiter", text: "About 5 more minutes!", time: new Date(Date.now() - 1000 * 60 * 9), read: true },
      { id: 3, sender: "customer", text: "Is the pizza ready?", time: new Date(Date.now() - 1000 * 60 * 5), read: false },
    ],
  },
  {
    id: 3,
    table: "Table 12",
    customer: "Emily",
    unread: 1,
    lastMessage: "Can I modify my order?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 1),
    messages: [
      { id: 1, sender: "customer", text: "Can I modify my order?", time: new Date(Date.now() - 1000 * 60 * 1), read: false },
    ],
  },
  {
    id: 4,
    table: "Table 5",
    customer: "David",
    unread: 0,
    lastMessage: "Thank you!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 20),
    messages: [
      { id: 1, sender: "customer", text: "Could we have the bill please?", time: new Date(Date.now() - 1000 * 60 * 25), read: true },
      { id: 2, sender: "waiter", text: "Of course! I'll bring it right over.", time: new Date(Date.now() - 1000 * 60 * 24), read: true },
      { id: 3, sender: "customer", text: "Thank you!", time: new Date(Date.now() - 1000 * 60 * 20), read: true },
    ],
  },
];

export default function WaiterMessagesPage() {
  const [chats, setChats] = useState(conversations);
  const [selectedChat, setSelectedChat] = useState<typeof conversations[0] | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeSince = (date: Date) => {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;
    
    const newMessage = {
      id: Date.now(),
      sender: "waiter" as const,
      text: messageInput,
      time: new Date(),
      read: true,
    };
    
    setChats(chats.map(chat => 
      chat.id === selectedChat.id 
        ? { 
            ...chat, 
            messages: [...chat.messages, newMessage],
            lastMessage: messageInput,
            lastMessageTime: new Date(),
          }
        : chat
    ));
    
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: messageInput,
      lastMessageTime: new Date(),
    });
    
    setMessageInput("");
    toast.success("Message sent");
  };

  const handleSelectChat = (chat: typeof conversations[0]) => {
    // Mark messages as read
    const updatedChat = {
      ...chat,
      unread: 0,
      messages: chat.messages.map(m => ({ ...m, read: true })),
    };
    setSelectedChat(updatedChat);
    setChats(chats.map(c => c.id === chat.id ? updatedChat : c));
  };

  const totalUnread = chats.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="p-6 h-[calc(100vh-4rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          {totalUnread > 0 ? `${totalUnread} unread messages` : "All caught up!"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
        {/* Conversation List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-0">
              <ScrollArea className="h-full">
                <div className="divide-y">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={cn(
                        "p-4 cursor-pointer hover:bg-muted transition-colors",
                        selectedChat?.id === chat.id && "bg-muted",
                        chat.unread > 0 && "bg-wine/5"
                      )}
                      onClick={() => handleSelectChat(chat)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={cn(
                            chat.unread > 0 ? "bg-wine text-white" : "bg-muted-foreground/20"
                          )}>
                            {chat.customer.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{chat.customer}</span>
                            <span className="text-xs text-muted-foreground">
                              {getTimeSince(chat.lastMessageTime)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {chat.table}
                            </Badge>
                            {chat.unread > 0 && (
                              <Badge className="bg-wine text-xs h-5 w-5 p-0 flex items-center justify-center">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {chat.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {selectedChat ? (
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-wine text-white">
                      {selectedChat.customer.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedChat.customer}</h3>
                    <p className="text-sm text-muted-foreground">{selectedChat.table}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.sender === "waiter" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2",
                          msg.sender === "waiter"
                            ? "bg-wine text-white rounded-br-md"
                            : "bg-muted rounded-bl-md"
                        )}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className={cn(
                          "flex items-center gap-1 mt-1",
                          msg.sender === "waiter" ? "justify-end" : "justify-start"
                        )}>
                          <span className={cn(
                            "text-[10px]",
                            msg.sender === "waiter" ? "text-white/70" : "text-muted-foreground"
                          )}>
                            {formatTime(msg.time)}
                          </span>
                          {msg.sender === "waiter" && (
                            msg.read 
                              ? <CheckCheck className="h-3 w-3 text-white/70" />
                              : <Check className="h-3 w-3 text-white/70" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-wine hover:bg-wine/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Quick replies */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setMessageInput("I'll be right there!")}
                  >
                    On my way!
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setMessageInput("Coming right up!")}
                  >
                    Coming right up
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setMessageInput("Of course, give me just a moment.")}
                  >
                    One moment
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a chat from the list to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
