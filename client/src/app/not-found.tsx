"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="mx-auto container my-8 bg-gradient-to-br rounded-lg shadow-md bg-secondary flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Large 404 Text */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary select-none">
            404
          </h1>
          <div className="relative">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Page Not Found</h2>
            <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
              Oops! The page you&apos;re looking for seems to have wandered off into the digital wilderness.
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex justify-center py-8">
          <div className="relative animate-pulse">
            <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-slate-300">
              <Search className="w-16 h-16 text-slate-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-red-500 text-xl font-bold">✕</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="min-w-[160px]">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="min-w-[160px] bg-transparent">
            <button onClick={() => window.history.back()} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </div>
  )
}
