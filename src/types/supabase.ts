export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      registrations: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          occupation: string
          goal: string
          challenge: string | null
          payment_status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
          transaction_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          occupation: string
          goal: string
          challenge?: string | null
          payment_status?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
          transaction_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          occupation?: string
          goal?: string
          challenge?: string | null
          payment_status?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
          transaction_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          registration_id: string
          amount: number
          status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
          phonepe_transaction_id: string | null
          merchant_transaction_id: string
          payment_method: string | null
          raw_response: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          registration_id: string
          amount: number
          status?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
          phonepe_transaction_id?: string | null
          merchant_transaction_id: string
          payment_method?: string | null
          raw_response?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          registration_id?: string
          amount?: number
          status?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
          phonepe_transaction_id?: string | null
          merchant_transaction_id?: string
          payment_method?: string | null
          raw_response?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          event_type: string
          payload: Json | null
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          payload?: Json | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          payload?: Json | null
          status?: string | null
          created_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      payment_status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
