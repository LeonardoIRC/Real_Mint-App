// Centro de KYC

import { useState } from "react";
import { useApp } from "../../context/AppContext";

const formatDate = (timestamp) => {
  if (!timestamp) return "—";
  return new Date(timestamp).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StatusBadge = ({ status }) => {
  const configs = {
    not_started: {
      label: "Não iniciado",
      color: "text-zinc-400",
      bg: "bg-zinc-800/40",
      border: "border-zinc-700",
      dot: "bg-zinc-500",
    },
    in_progress: {
      label: "Em análise",
      color: "text-yellow-300",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/40",
      dot: "bg-yellow-400",
    },
    approved: {
      label: "Aprovado",
      color: "text-green-300",
      bg: "bg-green-500/10",
      border: "border-green-500/40",
      dot: "bg-green-400",
    },
    rejected: {
      label: "Rejeitado",
      color: "text-red-300",
      bg: "bg-red-500/10",
      border: "border-red-500/40",
      dot: "bg-red-400",
    },
  };
  const config = configs[status] || configs.not_started;
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${config.color} ${config.bg} ${config.border}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

export function KYCCenter() {
  const { user, kyc, startKycMock } = useApp();
  const [loading, setLoading] = useState(false);
  const status = kyc?.status || "not_started";

  const label =
    status === "not_started"
      ? "Iniciar Verificação KYC"
      : status === "in_progress"
      ? "Continuar Verificação"
      : status === "approved"
      ? "Ver Detalhes"
      : "Reiniciar Verificação";

  const run = async () => {
    setLoading(true);
    await startKycMock();
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Verificação de Identidade (KYC)</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Verificação opcional que desbloqueia recursos avançados e maior limite de transações.
        </p>
      </div>

      {!user && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-zinc-400 text-sm">Faça login para iniciar o processo de verificação KYC.</p>
        </div>
      )}

      {user && (
        <>
          {/* Status Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-zinc-400 text-xs mb-2">Status da Verificação</div>
                <StatusBadge status={status} />
              </div>
              {status === "approved" && (
                <div className="text-right">
                  <div className="text-zinc-400 text-xs mb-1">Aprovado em</div>
                  <div className="text-zinc-300 text-sm font-medium">
                    {formatDate(kyc?.approvedAt)}
                  </div>
                </div>
              )}
            </div>

            {status === "in_progress" && (
              <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 text-blue-300 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  Verificação em andamento...
                </div>
                {kyc?.startedAt && (
                  <div className="text-zinc-400 text-xs mt-2">
                    Iniciado em {formatDate(kyc.startedAt)}
                  </div>
                )}
              </div>
            )}

            {status === "approved" && (
              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-green-300 text-sm font-medium mb-1">✓ Verificação Aprovada</div>
                  <div className="text-zinc-400 text-xs">
                    Sua identidade foi verificada com sucesso. Você agora tem acesso a todos os recursos da plataforma.
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800">
                  <div>
                    <div className="text-zinc-400 text-xs mb-1">Provedor</div>
                    <div className="text-zinc-300 text-sm">{kyc?.provider || "RealMint"}</div>
                  </div>
                  {kyc?.startedAt && (
                    <div>
                      <div className="text-zinc-400 text-xs mb-1">Iniciado em</div>
                      <div className="text-zinc-300 text-sm">{formatDate(kyc.startedAt)}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {status === "not_started" && (
              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-lg bg-zinc-800/40 border border-zinc-700">
                  <div className="text-zinc-300 text-sm mb-2">O que é KYC?</div>
                  <ul className="text-zinc-400 text-xs space-y-1 list-disc list-inside">
                    <li>Verificação de identidade rápida e segura</li>
                    <li>Desbloqueia limites maiores de transação</li>
                    <li>Acesso a recursos avançados da plataforma</li>
                    <li>Processo totalmente opcional</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-blue-300 text-sm font-medium mb-1">Benefícios</div>
                  <div className="text-zinc-400 text-xs">
                    Com KYC aprovado, você pode realizar transações maiores, acessar produtos financeiros avançados e
                    ter prioridade no suporte.
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-zinc-800">
              <button
                disabled={!user || loading || status === "in_progress"}
                onClick={run}
                className="px-4 py-2.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-200 hover:bg-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </>
                ) : (
                  label
                )}
              </button>
              {status === "approved" && (
                <button
                  onClick={run}
                  className="px-4 py-2.5 rounded-lg bg-zinc-800/60 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition text-sm"
                >
                  Reiniciar
                </button>
              )}
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="text-zinc-400 text-xs">
              <strong className="text-zinc-300">Nota:</strong> A plataforma funciona normalmente sem KYC. A verificação
              é opcional e apenas desbloqueia recursos adicionais.
            </div>
          </div>
        </>
      )}
    </div>
  );
}

