import { Dialog } from "../components/ui/Dialog";
import  StoryGrid  from './StoryGrid';

export const All = () => (
  <StoryGrid columns={1}>
    <Dialog title="Level Protocol" open>
      {[...Array(10)].map((index => (
        <>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum amet dolor necessitatibus, similique alias minus laudantium nostrum obcaecati rem iure unde. Consectetur deserunt temporibus quaerat corporis labore veritatis, dignissimos blanditiis.
          </p>
          <br />
        </>
      )))}
    </Dialog>
  </StoryGrid>
);

export default {
  title: 'Dialog',
};