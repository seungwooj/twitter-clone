import styled from "styled-components";
import { ITweet } from "./Timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
`;

const Column = styled.div``;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20%;
`;

const FuncBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FuncBtn = styled.button`
  color: white;
  border: none;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteBtn = styled(FuncBtn)`
  background-color: tomato;
`;

export default function Tweet({
  username,
  photoUrl,
  tweet,
  userId,
  id,
}: ITweet) {
  const user = auth.currentUser;
  const isOwner = user?.uid === userId;

  const onDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (!ok || !isOwner) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photoUrl) {
        // delete photo from storage
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.log(error);
    } finally {
      //
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        <FuncBtnContainer>
          {isOwner && <DeleteBtn onClick={onDelete}>Delete</DeleteBtn>}
        </FuncBtnContainer>
      </Column>
      {photoUrl && (
        <Column>
          <Photo src={photoUrl} />
        </Column>
      )}
    </Wrapper>
  );
}
