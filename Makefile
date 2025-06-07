# include .env

.PHONY: setup-supabase-env-development
setup-supabase-env-development: # Setup Supabase environment variables
	@echo "Setting up Supabase environment variables..."
	@if [ -f "supabase/.env.development" ]; then \
		echo "Copying supabase/.env.development to supabase/.env..."; \
		cp ./supabase/.env.development ./supabase/.env; \
	else \
		echo ".env.development dose not exists."; \
	fi

.PHONY: supabase-up
supabase-up: # Run local development environment
	@make setup-supabase-env-development
	@set -a && \
	. ./supabase/.env && \
	set +a && \
	supabase start

.PHONY: supabase-down
supabase-down: # Stop local development environment
	@echo "Stopping Supabase local development environment..."
	@set -a && \
	. ./supabase/.env && \
	set +a && \
	supabase stop

.PHONY: supabase-reset
supabase-reset: # Reset local development environment
	@echo "Resetting Supabase local development environment..."
	@set -a && \
	. ./supabase/.env && \
	set +a && \
	supabase db reset 
