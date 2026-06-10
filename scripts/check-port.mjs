import net from "node:net";

const port = Number(process.argv[2] ?? 3000);

if (!Number.isFinite(port)) {
  process.stderr.write("Porta inválida.\n");
  process.exit(1);
}

const server = net.createServer();
server.unref();

server.on("error", (error) => {
  if (error && typeof error === "object" && "code" in error && error.code === "EADDRINUSE") {
    process.stderr.write(
      `A porta ${port} já está em uso. Feche o processo que está usando essa porta e rode novamente.\\n`
    );
    process.exit(1);
  }

  process.stderr.write(`Erro ao checar porta ${port}: ${String(error)}\\n`);
  process.exit(1);
});

server.listen(port, "127.0.0.1", () => {
  server.close(() => {
    process.exit(0);
  });
});

