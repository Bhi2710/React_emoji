import {useState, useEffect} from 'react';
import emojiList from "../emojiList";
import EmojiContainer from './EmojiContainer';

const Main = () => {
  const [list, setList] = useState(emojiList);
  const [keyword, setKeyword] = useState("");

  const typed = (e) => {
    const value = e.target.value.toLowerCase();
    setKeyword(value);
  }

  useEffect(_ => {
    //Filter based on description, category, alases
    const filterList = emojiList.filter(singleEmoji => {

      if(singleEmoji.emoji === keyword) {
        return true;
      }

      if(singleEmoji.description.startsWith(keyword)) {
        return true;
      }
      
      if(singleEmoji.category.startsWith(keyword)) {
        return true;
      }

      if(singleEmoji.aliases.some(e => e.startsWith(keyword))) {
        return true;
      }

      return false;
    });

    setList(filterList);
  }, [keyword]);

  return (
    <main>
      <div className='search'>
        <input type="text" placeholder="Search 🔍" onKeyUp={typed}/>
        {keyword === "" ? false : ( <h3>Result for - {keyword} </h3> )}
      </div>
      <p className='Click'>Click to copy your emoji...  ✔</p>
      <hr />
      {list.length === 0 ? (
        <h3 className='no-result'>No Emoji Found 😟</h3>
      ) : (
        <EmojiContainer list={list} />
      )}

    </main>
  )
}

export default Main;