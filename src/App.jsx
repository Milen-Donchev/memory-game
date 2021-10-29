import { Flex } from "@chakra-ui/react";

import PlayingBoard from "./components/playing_board/PlayingBoard";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <Flex>
      <Sidebar />
      <PlayingBoard />
    </Flex>
  );
}

export default App;
