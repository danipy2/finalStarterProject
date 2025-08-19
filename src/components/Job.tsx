import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetBookmarksQuery,
} from "../services/bookmarkApi"; 

interface propsType {
  photo: string;
  Title: string;
  subtitle: string[];
  description: string;
  fields: string[];
  ind: string;
  opType:string;
}

const Job = ({ photo, Title, subtitle, description, fields, ind,opType }: propsType) => {
  const navigate = useNavigate();
  const { data: bookmarksResponse } = useGetBookmarksQuery();
 

  const bookmarks = bookmarksResponse?.data??[];
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    console.log(ind,bookmarks)
    if (bookmarks) {
      setBookmarked(bookmarks.some((b) => b.eventID === ind));
    }
  }, [bookmarks, ind]);



  const handleNavigate = () => {
    navigate("/Descrpition/" + ind);
  };

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!localStorage.getItem("token")) {
      alert("Please login to bookmark jobs.");
      return;
    }

    try {
      if (bookmarked) {
        console.log("ind",ind)
        await removeBookmark(ind).unwrap();
      } else {
        console.log('unbookmark',ind)
        await addBookmark(ind).unwrap();
      }
      setBookmarked(!bookmarked);
      console.log(bookmarked)
    } catch (err) {
      console.error("Bookmark failed:", err);
    }
  };
  const f = [opType,...fields]
  return (
    <div
      className="hover:bg-blue-200 shadow-2xl rounded-3xl m-2 flex flex-row p-5 pl-7 gap-2 mb-5 relative"
      onClick={handleNavigate}
    >

      <button
        onClick={toggleBookmark}
        data-testid="bookmark-toggle"
        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-100"
      >
        
        {bookmarked ? <BookmarkCheck className="text-blue-600" /> : <Bookmark />}
      </button>

      <div className="grid h-full basis-1/8 justify-center">
        <img src={photo} alt="job1" className="h-10 object-contain" />
      </div>

      <div className="basis-7/8">
        <div className="font-semibold text-2xl">{Title}</div>
         <div className="flex gap-2 mt-4">{subtitle.map((c,ind)=><p key={ind}  className="font-[300]">{c}</p>)}</div>
        <div>{description}</div>
        <div className="flex gap-2 mt-4">
          {f.map((c, ind) => (
            <p
              key={ind}
              className={`rounded-xl p-2 ${
                ["border border-blue-200 text-blue-400 bg-blue-200",
                 "border border-red-200 text-red-400 bg-red-200",
                 "border border-green-200 text-green-400 bg-green-200"
                ][(ind + 1) % 3]
              }`}
            >
              {c}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Job;
