import Conversation from "./Conversation"
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";


const Conversations = () => {

  const {loading,conversation}=useGetConversations();
  
  return (
    <>
        <div className="py-2 flex flex-col overflow-auto">
            {conversation.map((conversatioon,idx)=>(
              <Conversation
                key = {conversatioon._id}
                conversation={conversatioon}
                emoji = {getRandomEmoji()}
                lastIdx = {idx=== conversation.length - 1 }
                />
            ))}
            {loading?<span className="loading loading-spinner mx-auto"></span>:null}
        </div>
    </>
  )
}

export default Conversations