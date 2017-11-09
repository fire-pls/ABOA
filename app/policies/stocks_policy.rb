class StocksPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    true
  end

  def create?
    user.admin
  end

  def show?
    true
  end

  def destroy?
    user.admin
  end

  def update?
    user.admin
  end
end
