"use client";
import Link from "next/link";
import {
  FileText,
  Clock,
  Newspaper,
  Building2,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
const statusLabels: Record<string, string> = {
  pending: "Menunggu",
  reviewing: "Ditinjau",
  approved: "Disetujui",
  rejected: "Ditolak",
};
export default function OverviewTab({
  dashboardData,
  onNavigate,
}: {
  dashboardData: any;
  onNavigate: (tab: string) => void;
}) {
  const stats = [
    {
      label: "Total pengajuan",
      value: dashboardData?.totalApplications,
      icon: FileText,
      tab: "applications",
    },
    {
      label: "Menunggu ditinjau",
      value: dashboardData?.pendingApplications,
      icon: Clock,
      tab: "applications",
    },
    {
      label: "Artikel",
      value: dashboardData?.totalNews,
      icon: Newspaper,
      tab: "news",
    },
    {
      label: "Mitra strategis",
      value: dashboardData?.totalStrategicPartners,
      icon: Building2,
      tab: "partners",
    },
  ];
  return (
    <div className="admin-overview">
      <div className="admin-stats">
        {stats.map(({ label, value, icon: Icon, tab }) => (
          <button
            type="button"
            onClick={() => onNavigate(tab)}
            className="admin-stat"
            key={label}
          >
            <div>
              <span>{label}</span>
              <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <strong>
              {value == null ? "—" : Number(value).toLocaleString("id-ID")}
            </strong>
            <span>
              Lihat data <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      <section className="admin-panel">
        <div className="admin-panel-heading admin-panel-toolbar">
          <div>
            <h2>Pengajuan terbaru</h2>
            <p>Aktivitas pengajuan yang masuk ke portal.</p>
          </div>
          <Button variant="outline" onClick={() => onNavigate("applications")}>
            Semua pengajuan <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </div>
        <div className="admin-table-scroll">
          <table>
            <thead>
              <tr>
                <th>ID pengajuan</th>
                <th>Nasabah</th>
                <th>Jumlah</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>
                  <span className="sr-only">Detail</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {(dashboardData?.recentApplications || []).map((app: any) => (
                <tr key={app.application_id || app.id}>
                  <td className="admin-table-id">
                    {app.application_id || app.id}
                  </td>
                  <td>{app.customer_name || app.name}</td>
                  <td>
                    {Number.isFinite(Number(app.amount))
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(Number(app.amount))
                      : app.amount}
                  </td>
                  <td>
                    <span className={"admin-status admin-status-" + app.status}>
                      {statusLabels[app.status] || app.status}
                    </span>
                  </td>
                  <td>
                    {app.created_at
                      ? new Date(app.created_at).toLocaleDateString("id-ID")
                      : app.date || "—"}
                  </td>
                  <td>
                    <Link
                      className="admin-row-link"
                      href={
                        "/pengajuan/" +
                        encodeURIComponent(app.application_id || app.id)
                      }
                      aria-label={
                        "Lihat pengajuan " + (app.application_id || app.id)
                      }
                    >
                      <ArrowUpRight size={19} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!dashboardData || !dashboardData.recentApplications?.length) && (
            <div className="admin-empty" role="status">
              <FileText size={30} strokeWidth={1.3} aria-hidden="true" />
              <h3>
                {dashboardData
                  ? "Belum ada pengajuan terbaru"
                  : "Data belum tersedia"}
              </h3>
              <p>
                {dashboardData
                  ? "Pengajuan yang masuk akan ditampilkan di sini."
                  : "Ringkasan akan ditampilkan setelah data berhasil dimuat."}
              </p>
            </div>
          )}
        </div>
      </section>
      <div className="admin-overview-bottom">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h2>Akses cepat</h2>
            <p>Lanjutkan pekerjaan Anda.</p>
          </div>
          <div className="admin-shortcuts">
            <Link href="/pengajuan">
              <Plus size={19} aria-hidden="true" />
              <span>Form pengajuan</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/dashboard/news?action=create">
              <Newspaper size={19} aria-hidden="true" />
              <span>Tulis artikel baru</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <button type="button" onClick={() => onNavigate("partners")}>
              <Building2 size={19} aria-hidden="true" />
              <span>Kelola mitra</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
        </section>
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h2>Artikel terbaru</h2>
            <p>Pembaruan konten perusahaan.</p>
          </div>
          <div className="admin-recent-news">
            {(dashboardData?.recentNews || []).map((article: any) => (
              <Link
                key={article.id}
                href={"/dashboard/news?edit=" + article.id}
              >
                <div>
                  <span className="admin-meta">{article.status}</span>
                  <h3>{article.title}</h3>
                </div>
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ))}
            {!dashboardData?.recentNews?.length && (
              <p className="admin-muted">
                Belum ada artikel untuk ditampilkan.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
