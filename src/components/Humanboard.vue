<script>
import Chessboard from "./Chessboard";

export default {
  name: "Humanboard",
  extends: Chessboard,
  methods: {},
  mounted() {
    this.loadPosition();
    this.board.set({
      movable: { events: { after: this.playerMove() } }
    });
  }
};
</script>
