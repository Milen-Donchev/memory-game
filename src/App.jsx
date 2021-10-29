import { Flex } from "@chakra-ui/react";
import PlayingBoard from "./components/PlayingBoard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Flex>
      <Sidebar />
      <PlayingBoard />
    </Flex>
  );
}

export default App;
