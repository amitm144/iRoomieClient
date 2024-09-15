import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { users } from "@/lib/http";
import MatchToy from "@/components/Coustom/RoomatesAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Send } from 'lucide-react';

export default function Chat() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [message, setMessage] = useState('');

  const { data: matches, isPending, isError, error } = useQuery({
    queryKey: ["chat", "matches"],
    queryFn: users.matches,
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleSendMessage = () => {
    // Implement send message logic here
    setMessage('');
  };

  const renderChatArea = () => {
    if (!selectedMatch) return null;

    return (
      <div className="flex flex-col h-full">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <MatchToy
                image={selectedMatch.matchInfo.image}
                score={selectedMatch.matchInfo.score}
                title={selectedMatch.matchInfo.title}
                subTitle={selectedMatch.matchInfo.subTitle}
              />
            </div>
      
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow mb-4">
          <p className="p-4">Chat messages with {selectedMatch.matchInfo.title} will appear here.</p>
        </ScrollArea>
        <div className="flex space-x-2 p-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 h-[90vh]">
      <h1 className="text-2xl font-bold mb-6">Your Matches</h1>
      <ScrollArea className="h-[calc(100%-3rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches && matches.map((match) => (
            <Sheet key={match.match._id}>
              <SheetTrigger asChild>
                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedMatch(match)}
                >
                  <CardContent className="p-4">
                    <MatchToy
                      image={match.matchInfo.image}
                      score={match.matchInfo.score}
                      title={match.matchInfo.title}
                      subTitle={match.matchInfo.subTitle}
                    />
                  </CardContent>
                </Card>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[40%] sm:max-w-full">
                {renderChatArea()}
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}